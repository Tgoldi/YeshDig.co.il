import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join, resolve, sep } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const securityHeaders = (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    if (process.env.NODE_ENV === 'production') {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    next();
};
app.use(securityHeaders);

// Block access to sensitive project files (source control, env, deps, server code, config)
const BLOCKED_PATH = /(^|\/)(\.[^/]*|node_modules|server\.js|package(-lock)?\.json)(\/|$)/i;
app.use((req, res, next) => {
    let p;
    try {
        p = decodeURIComponent(req.path);
    } catch (e) {
        return res.status(400).send('Bad request');
    }
    if (p.includes('\0') || BLOCKED_PATH.test(p)) {
        return res.status(404).send('Not found');
    }
    next();
});

// Handle modules
app.get('/@vite/client', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.send(`
        export const injectQuery = () => {};
        export const createHotContext = () => {};
        export default {};
    `);
});

app.get('/@react-refresh', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.send(`
        const RefreshRuntime = {
            injectIntoGlobalHook(global) {
                global.__reactRefreshApi = {
                    performReactRefresh() {},
                    scheduleRefresh() {},
                    scheduleRoot() {},
                    getMountedRootCount() { return 0; }
                };
            }
        };
        window.$RefreshReg$ = () => {};
        window.$RefreshSig$ = () => (type) => type;
        export { RefreshRuntime as default };
    `);
});

// Case-insensitive file lookup helper
function findFileInsensitive(filepath) {
    try {
        const dir = dirname(filepath);
        const baseFileName = filepath.split(/[\\/]/).pop().toLowerCase();
        const files = fs.readdirSync(dir);
        const matchingFile = files.find(file => file.toLowerCase() === baseFileName);
        return matchingFile ? join(dir, matchingFile) : null;
    } catch (err) {
        return null;
    }
}

// Handle GIFs
app.get('*.gif', (req, res) => {
    const root = resolve(__dirname);
    const requestedPath = resolve(root, '.' + req.path);
    if (!requestedPath.startsWith(root + sep)) {
        return res.status(404).send('Not found');
    }
    const filePath = findFileInsensitive(requestedPath);
    
    if (filePath && resolve(filePath).startsWith(root + sep) && filePath.toLowerCase().endsWith('.gif') && fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        res.writeHead(200, {
            'Content-Type': 'image/gif',
            'Content-Length': stat.size,
            'Cache-Control': 'public, max-age=31536000'
        });
        fs.createReadStream(filePath).pipe(res);
    } else {
        res.status(404).send('Not found');
    }
});

// Handle JavaScript files
app.get('*.js', (req, res, next) => {
    res.set('Content-Type', 'application/javascript');
    next();
});

// Serve static files
app.use(express.static(__dirname, { dotfiles: 'deny' }));

// SPA fallback
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, 'localhost', () => console.log(`Server running on port ${PORT}`));