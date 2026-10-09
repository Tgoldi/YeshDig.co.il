import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join, resolve, sep, extname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Block access to server code, secrets, dotfiles and dependency/VCS folders
const BLOCKED_NAMES = new Set(['server.js', 'package.json', 'package-lock.json', 'node_modules', 'yarn.lock', 'pnpm-lock.yaml']);
app.use((req, res, next) => {
    let decoded;
    try {
        decoded = decodeURIComponent(req.path);
    } catch (err) {
        return res.status(400).send('Bad request');
    }
    if (decoded.includes('\0')) {
        return res.status(400).send('Bad request');
    }
    const segments = decoded.split(/[\\/]+/).filter(Boolean);
    const blocked = segments.some(seg => {
        const lower = seg.toLowerCase();
        return lower.startsWith('.') || BLOCKED_NAMES.has(lower);
    });
    if (blocked) {
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
        const baseFileName = decodeURIComponent(filepath.split('/').pop()).toLowerCase();
        const files = fs.readdirSync(dir);
        const matchingFile = files.find(file => file.toLowerCase() === baseFileName);
        return matchingFile ? join(dir, matchingFile) : null;
    } catch (err) {
        return null;
    }
}

// Handle GIFs
app.get('*.gif', (req, res) => {
    let requestedPath;
    try {
        requestedPath = resolve(__dirname, '.' + decodeURIComponent(req.path));
    } catch (err) {
        return res.status(400).send('Bad request');
    }
    if (!requestedPath.startsWith(resolve(__dirname) + sep)) {
        return res.status(404).send('Not found');
    }
    const filePath = findFileInsensitive(requestedPath);
    
    if (
        filePath &&
        filePath.startsWith(resolve(__dirname) + sep) &&
        extname(filePath).toLowerCase() === '.gif' &&
        fs.existsSync(filePath) &&
        fs.statSync(filePath).isFile()
    ) {
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
app.use(express.static(__dirname, { dotfiles: 'ignore' }));

// SPA fallback
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, 'localhost', () => console.log(`Server running on port ${PORT}`));