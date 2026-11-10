import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join, resolve, sep, extname } from 'path';
import fs from 'fs';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Standard protective security headers (helmet-equivalent, no extra dependency)
app.disable('x-powered-by');
app.use((req, res, next) => {
    res.set({
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Strict-Transport-Security': 'max-age=15552000',
        'X-DNS-Prefetch-Control': 'off',
        'X-Download-Options': 'noopen',
        'X-Permitted-Cross-Domain-Policies': 'none',
        'Cross-Origin-Resource-Policy': 'same-site',
        'Origin-Agent-Cluster': '?1'
    });
    next();
});

const ROOT = resolve(__dirname);

// True when the path stays inside the project folder and has no hidden or dependency folders in it
function isSafePublicPath(absPath) {
    const resolved = resolve(absPath);
    if (!resolved.startsWith(ROOT + sep)) return false;
    const segments = resolved.slice(ROOT.length + 1).split(sep);
    return !segments.some(s => s.startsWith('.') || s === 'node_modules');
}

// Lead relay: the contact forms POST here when the site is built with VITE_LEAD_ENDPOINT=/api/lead.
// The fixdigital IDs stay on the server, visitors' details arrive in the request body,
// and submissions are rate-limited per visitor and per day.
// This server listens on localhost only, so the forwarding address comes from the local proxy.
app.set('trust proxy', 'loopback');

const FIXDIGITAL_LEAD_URL = 'https://www.fixdigital.co.il/api/v1.2/lead/addApi';
const FIXDIGITAL_IDS = {
    projectID: process.env.FIXDIGITAL_PROJECT_ID || '11860',
    projectTypeID: process.env.FIXDIGITAL_PROJECT_TYPE_ID || '10',
    clientID: process.env.FIXDIGITAL_CLIENT_ID || '21350',
    tenantID: process.env.FIXDIGITAL_TENANT_ID || '7768'
};

function positiveNumber(raw, fallback) {
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : fallback;
}
const LEAD_WINDOW_MS = 60 * 60 * 1000;
const LEAD_DAY_MS = 24 * LEAD_WINDOW_MS;
// Both limits count per visitor address, so no visitor can use up the quota of the others
const LEAD_MAX_PER_HOUR = positiveNumber(process.env.LEAD_MAX_PER_HOUR, 20);
const LEAD_MAX_PER_DAY = positiveNumber(process.env.LEAD_MAX_PER_DAY, 50);
const leadHits = new Map();
// Most senders tracked at once (memory stays bounded however many addresses send)
const LEAD_MAX_TRACKED = positiveNumber(process.env.LEAD_MAX_TRACKED, 50000);
let warnedNoVisitorAddress = false;

function isLoopback(ip) {
    return !ip || ip === '::1' || ip.startsWith('127.') || ip.startsWith('::ffff:127.');
}

function leadAllowed(ip) {
    if (isLoopback(ip)) {
        // The proxy sent no visitor address: every visitor would share one counter,
        // so one sender could block all real leads. Do not count these.
        if (!warnedNoVisitorAddress) {
            warnedNoVisitorAddress = true;
            console.warn('WARNING: /api/lead got no visitor address. Make the proxy in front of server.js set X-Forwarded-For so lead submissions can be rate-limited per visitor.');
        }
        return true;
    }
    const key = leadKey(ip);
    const now = Date.now();
    const recentDay = (leadHits.get(key) || []).filter(t => now - t < LEAD_DAY_MS);
    const recentHour = recentDay.filter(t => now - t < LEAD_WINDOW_MS);
    const allowed = !(recentHour.length >= LEAD_MAX_PER_HOUR || recentDay.length >= LEAD_MAX_PER_DAY);
    if (allowed) recentDay.push(now);
    // Re-insert so the map keeps the most recently seen senders last
    leadHits.delete(key);
    leadHits.set(key, recentDay);
    // Hard cap on tracked senders: drop the least recently seen ones (constant work per request)
    while (leadHits.size > LEAD_MAX_TRACKED) {
        leadHits.delete(leadHits.keys().next().value);
    }
    return allowed;
}

// One counter per IPv4 address and per IPv6 /64 network, so rotating through
// the addresses of one IPv6 network does not create new counters.
function leadKey(ip) {
    const addr = String(ip).split('%')[0].toLowerCase();
    if (!addr.includes(':')) return addr;
    if (addr.startsWith('::ffff:') && addr.includes('.')) return addr.slice(7);
    let groups;
    if (addr.includes('::')) {
        const [head, tail] = addr.split('::');
        const h = head ? head.split(':') : [];
        const t = tail ? tail.split(':') : [];
        groups = [...h, ...new Array(Math.max(0, 8 - h.length - t.length)).fill('0'), ...t];
    } else {
        groups = addr.split(':');
    }
    return groups.slice(0, 4).map(g => g.replace(/^0+(?=.)/, '')).join(':') + '::/64';
}

// Drop senders with no submission in the last day, on a timer instead of on each request
setInterval(() => {
    const now = Date.now();
    for (const [k, times] of leadHits) {
        if (!times.some(t => now - t < LEAD_DAY_MS)) leadHits.delete(k);
    }
}, 10 * 60 * 1000).unref();

function leadField(value, max) {
    return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

// Hidden form field that people never fill; the forms send it empty.
const LEAD_HONEYPOT_FIELD = 'hp_extra_info';

// Server-side captcha (Cloudflare Turnstile). Off until TURNSTILE_SECRET_KEY is set,
// so the forms keep working as today; build the site with VITE_TURNSTILE_SITE_KEY to show the widget.
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || '';
if (!TURNSTILE_SECRET_KEY) {
    console.warn('TURNSTILE_SECRET_KEY is not set: POST /api/lead accepts leads without a captcha check. Set TURNSTILE_SECRET_KEY here and build the site with VITE_TURNSTILE_SITE_KEY to require one.');
}

function verifyCaptcha(token, ip) {
    return new Promise((resolve) => {
        if (!token) return resolve(false);
        const form = new URLSearchParams({ secret: TURNSTILE_SECRET_KEY, response: token });
        if (ip) form.set('remoteip', ip);
        const payload = form.toString();
        let settled = false;
        const settle = (ok) => {
            if (settled) return;
            settled = true;
            resolve(ok);
        };
        const check = https.request('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(payload)
            },
            timeout: 10000
        }, (up) => {
            let data = '';
            up.setEncoding('utf8');
            up.on('data', (chunk) => { if (data.length < 65536) data += chunk; });
            up.on('end', () => {
                try {
                    settle(JSON.parse(data).success === true);
                } catch (err) {
                    settle(false);
                }
            });
            up.on('error', () => settle(false));
        });
        check.on('timeout', () => check.destroy(new Error('timeout')));
        check.on('error', () => settle(false));
        check.end(payload);
    });
}

app.post('/api/lead', express.json({ limit: '16kb' }), async (req, res) => {
    const body = req.body && typeof req.body === 'object' ? req.body : {};
    const lead = {
        name: leadField(body.name, 200),
        email: leadField(body.email, 200),
        phone: leadField(body.phone, 30),
        message: leadField(body.message, 5000),
        plan: leadField(body.plan, 300),
        formUrl: leadField(body.formUrl, 2000),
        urlRefer: leadField(body.urlRefer, 2000)
    };
    if (lead.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) ||
        lead.phone.length < 9 || lead.message.length < 10) {
        return res.status(400).json({ ok: false });
    }
    // A filled honeypot means a bot: answer as if it worked, forward nothing
    if (leadField(body[LEAD_HONEYPOT_FIELD], 200) !== '') {
        return res.status(200).json({ ok: true });
    }
    if (TURNSTILE_SECRET_KEY && !(await verifyCaptcha(leadField(body.captchaToken, 2048), req.ip))) {
        return res.status(403).json({ ok: false });
    }
    if (!leadAllowed(req.ip)) {
        return res.status(429).json({ ok: false });
    }

    const params = {
        ...FIXDIGITAL_IDS,
        FORMURL: lead.formUrl,
        URLREFER: lead.urlRefer,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        channelid: 'website',
        message: lead.message,
        ...(lead.plan ? { plan: lead.plan } : {}),
        source: 'website'
    };
    const query = Object.entries(params)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join('&');

    let done = false;
    const finish = (status) => {
        if (done) return;
        done = true;
        res.status(status).json({ ok: status === 200 });
    };
    const upstream = https.get(`${FIXDIGITAL_LEAD_URL}?${query}`, {
        headers: { 'Accept': 'application/json' },
        timeout: 10000
    }, (up) => {
        up.resume();
        finish(up.statusCode >= 200 && up.statusCode < 300 ? 200 : 502);
    });
    upstream.on('timeout', () => upstream.destroy(new Error('timeout')));
    upstream.on('error', () => finish(502));
});

// Malformed or oversized lead bodies get a plain 400, never an error page
app.use('/api/lead', (err, req, res, next) => {
    if (res.headersSent) return next(err);
    res.status(err && err.status && err.status < 500 ? err.status : 400).json({ ok: false });
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

// The Vite build output: dist/ next to this file, or this file's own folder when the server
// runs from inside the build output (an assets/ folder and no src/ folder).
const DIST_DIR = join(__dirname, 'dist');
const BUILD_DIR = fs.existsSync(join(DIST_DIR, 'index.html'))
    ? DIST_DIR
    : (!fs.existsSync(join(__dirname, 'src')) && fs.existsSync(join(__dirname, 'assets')) ? ROOT : null);
if (!BUILD_DIR) {
    console.warn('WARNING: no Vite build output found (dist/index.html). Run the build so the site\'s scripts can be served.');
}
const PUBLIC_DIR = join(__dirname, 'public');

// Handle GIFs (looked up in the build output first, then the project folder, then public/)
app.get('*.gif', (req, res) => {
    let decodedPath;
    try {
        decodedPath = decodeURIComponent(req.path);
    } catch (err) {
        return res.status(404).send('Not found');
    }
    const bases = [...new Set([BUILD_DIR, ROOT, PUBLIC_DIR].filter(Boolean).map(b => resolve(b)))];
    for (const base of bases) {
        const requestedPath = resolve(join(base, decodedPath));
        if (!(requestedPath.startsWith(base + sep)) || !isSafePublicPath(requestedPath)) continue;
        const filePath = findFileInsensitive(requestedPath);
        if (filePath && filePath.startsWith(base + sep) && isSafePublicPath(filePath) &&
            filePath.toLowerCase().endsWith('.gif') &&
            fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const stat = fs.statSync(filePath);
            res.writeHead(200, {
                'Content-Type': 'image/gif',
                'Content-Length': stat.size,
                'Cache-Control': 'public, max-age=31536000'
            });
            return fs.createReadStream(filePath).pipe(res);
        }
    }
    res.status(404).send('Not found');
});

// Handle JavaScript files
app.get('*.js', (req, res, next) => {
    res.set('Content-Type', 'application/javascript');
    next();
});

// Serve static files.
// The Vite build output is served whole (scripts, styles, PWA files and all); outside it only
// the public folder and media/style assets are served. Source code, config, package files,
// dotfiles (.env, .git) and node_modules are never exposed.
const STATIC_EXTENSIONS = new Set([
    '.png', '.jpg', '.jpeg', '.svg', '.webp', '.avif', '.ico', '.bmp',
    '.woff', '.woff2', '.ttf', '.otf', '.eot',
    '.mp4', '.webm', '.mp3', '.ogg', '.wav',
    '.css'
]);
const staticOptions = { dotfiles: 'ignore', index: false, redirect: false };

// Files of the server itself, never served even when the server runs from inside the build output
const SERVER_ONLY_FILES = new Set(['server.js', 'package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'bun.lockb']);
if (BUILD_DIR) {
    const buildBase = resolve(BUILD_DIR);
    const buildAssets = express.static(buildBase, staticOptions);
    app.use((req, res, next) => {
        let decodedPath;
        try {
            decodedPath = decodeURIComponent(req.path);
        } catch (err) {
            return next();
        }
        const target = resolve(join(buildBase, decodedPath));
        if (!target.startsWith(buildBase + sep) || !isSafePublicPath(target)) return next();
        if (buildBase === ROOT && SERVER_ONLY_FILES.has(target.slice(ROOT.length + 1).toLowerCase())) return next();
        return buildAssets(req, res, next);
    });
}

app.use(express.static(PUBLIC_DIR, staticOptions));
app.use('/public', express.static(PUBLIC_DIR, staticOptions));

const rootAssets = express.static(__dirname, staticOptions);
app.use((req, res, next) => {
    let decodedPath;
    try {
        decodedPath = decodeURIComponent(req.path);
    } catch (err) {
        return next();
    }
    const ext = extname(decodedPath).toLowerCase();
    if (!STATIC_EXTENSIONS.has(ext) || !isSafePublicPath(join(ROOT, decodedPath))) {
        return next();
    }
    return rootAssets(req, res, next);
});

// SPA fallback
app.get('*', (req, res) => {
    res.sendFile(join(BUILD_DIR || __dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, 'localhost', () => console.log(`Server running on port ${PORT}`));