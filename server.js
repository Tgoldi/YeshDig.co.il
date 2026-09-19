import express from 'express';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(helmet());

const PUBLIC_DIR = path.join(__dirname, 'public');

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
        if (path.resolve(dir) !== path.resolve(PUBLIC_DIR)) {
            return null;
        }
        const baseFileName = decodeURIComponent(filepath.split('/').pop()).toLowerCase();
        const files = fs.readdirSync(dir);
        const matchingFile = files.find(file => file.toLowerCase() === baseFileName);
        if (!matchingFile) return null;
        const resolvedPath = path.resolve(join(dir, matchingFile));
        if (!resolvedPath.startsWith(path.resolve(PUBLIC_DIR) + path.sep)) {
            return null;
        }
        return resolvedPath;
    } catch (err) {
        return null;
    }
}

// Handle GIFs
app.get('*.gif', (req, res) => {
    const requestedPath = join(PUBLIC_DIR, decodeURIComponent(req.path));
    const resolvedRequestedPath = path.resolve(requestedPath);
    if (resolvedRequestedPath !== path.resolve(PUBLIC_DIR) &&
        !resolvedRequestedPath.startsWith(path.resolve(PUBLIC_DIR) + path.sep)) {
        return res.status(400).send('Bad request');
    }
    const filePath = findFileInsensitive(resolvedRequestedPath);

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
    res.sendFile(join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, 'localhost', () => console.log(`Server running on port ${PORT}`));