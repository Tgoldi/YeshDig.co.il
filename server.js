import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join, resolve, sep, extname, basename } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Only serve the built site. If a Vite build output ("dist") sits next to this
// file, serve that folder; otherwise this file was copied into the build output.
const DIST_DIR = join(__dirname, 'dist');
const PUBLIC_ROOT = resolve(
    fs.existsSync(join(DIST_DIR, 'index.html')) ? DIST_DIR : __dirname
);

// File types a browser needs; anything else (source, config, env, backups) is never served.
const ALLOWED_EXTENSIONS = new Set([
    '.html', '.js', '.mjs', '.css', '.json', '.webmanifest', '.txt', '.xml',
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif', '.ico',
    '.woff', '.woff2', '.ttf', '.otf', '.eot', '.mp4', '.webm', '.mp3', '.gz', '.br'
]);
// Project files that share an allowed extension but must never be public.
const BLOCKED_FILES = new Set([
    'server.js', 'package.json', 'package-lock.json', 'npm-shrinkwrap.json',
    'yarn.lock', 'pnpm-lock.yaml', 'tsconfig.json', 'tsconfig.app.json',
    'tsconfig.node.json', 'components.json', 'eslint.config.js',
    'postcss.config.js', 'tailwind.config.js', 'vite.config.js', 'vite.config.ts'
]);
const BLOCKED_DIRS = new Set(['node_modules', 'src', '.git']);

// Resolve a request path to a file inside PUBLIC_ROOT, or null if it is not public.
function resolvePublicPath(urlPath) {
    let decoded;
    try {
        decoded = decodeURIComponent(urlPath);
    } catch (err) {
        return null;
    }
    if (decoded.includes('\0')) return null;
    const full = resolve(PUBLIC_ROOT, '.' + sep + decoded);
    if (full !== PUBLIC_ROOT && !full.startsWith(PUBLIC_ROOT + sep)) return null;
    const relParts = full.slice(PUBLIC_ROOT.length).split(sep).filter(Boolean);
    for (const part of relParts) {
        const lower = part.toLowerCase().replace(/[. ]+$/, '');
        if (part.startsWith('.') || BLOCKED_DIRS.has(lower)) return null;
    }
    if (!relParts.length) return null;
    const name = basename(full).toLowerCase().replace(/[. ]+$/, '');
    if (BLOCKED_FILES.has(name)) return null;
    if (!ALLOWED_EXTENSIONS.has(extname(name))) return null;
    return full;
}

const app = express();
app.disable('x-powered-by');

// Standard browser security headers (the same core set helmet sets by default).
app.use((req, res, next) => {
    res.set({
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Strict-Transport-Security': 'max-age=15552000',
        'X-Download-Options': 'noopen',
        'X-Permitted-Cross-Domain-Policies': 'none',
        'Origin-Agent-Cluster': '?1'
    });
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
        const baseFileName = basename(filepath).toLowerCase();
        const files = fs.readdirSync(dir);
        const matchingFile = files.find(file => file.toLowerCase() === baseFileName);
        return matchingFile ? join(dir, matchingFile) : null;
    } catch (err) {
        return null;
    }
}

// Handle GIFs
app.get('*.gif', (req, res) => {
    const requestedPath = resolvePublicPath(req.path);
    const filePath = requestedPath ? findFileInsensitive(requestedPath) : null;
    
    if (filePath && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
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

// Serve static files: only public web assets inside PUBLIC_ROOT
const serveStatic = express.static(PUBLIC_ROOT, { dotfiles: 'deny', index: false, redirect: false });
app.use((req, res, next) => {
    if ((req.method !== 'GET' && req.method !== 'HEAD') || !resolvePublicPath(req.path)) {
        return next();
    }
    return serveStatic(req, res, next);
});

// SPA fallback
app.get('*', (req, res) => {
    res.sendFile(join(PUBLIC_ROOT, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, 'localhost', () => console.log(`Server running on port ${PORT}`));