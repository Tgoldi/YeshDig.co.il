import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const PUBLIC_DIR = join(__dirname, 'public');

// Minimal security headers (helmet-free)
app.use((req, res, next) => {
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('X-Frame-Options', 'DENY');
    res.set('X-XSS-Protection', '0');
    res.set('Referrer-Policy', 'no-referrer');
    res.set('Content-Security-Policy', "default-src 'self'");
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

// Case-insensitive file lookup helper, locked to PUBLIC_DIR
function findFileInsensitive(filepath) {
    try {
        const resolvedDir = dirname(filepath);
        if (!resolvedDir.startsWith(PUBLIC_DIR)) {
            return null;
        }
        const baseFileName = decodeURIComponent(filepath.split('/').pop()).toLowerCase();
        const files = fs.readdirSync(resolvedDir);
        const matchingFile = files.find(file => file.toLowerCase() === baseFileName);
        if (!matchingFile) return null;
        const resolvedFile = join(resolvedDir, matchingFile);
        if (!resolvedFile.startsWith(PUBLIC_DIR)) {
            return null;
        }
        return resolvedFile;
    } catch (err) {
        return null;
    }
}

// Handle GIFs
app.get('*.gif', (req, res) => {
    const decodedPath = decodeURIComponent(req.path);
    if (decodedPath.includes('..')) {
        return res.status(400).send('Invalid path');
    }
    const requestedPath = join(PUBLIC_DIR, decodedPath);
    if (!requestedPath.startsWith(PUBLIC_DIR)) {
        return res.status(400).send('Invalid path');
    }
    const filePath = findFileInsensitive(requestedPath);

    if (filePath && fs.existsSync(filePath)) {
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
app.use(express.static(PUBLIC_DIR));

// SPA fallback
app.get('*', (req, res) => {
    res.sendFile(join(PUBLIC_DIR, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, 'localhost', () => console.log(`Server running on port ${PORT}`));