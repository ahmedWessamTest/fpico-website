import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

console.log('Server executing from:', process.cwd());
console.log('Server dist folder path:', serverDistFolder);
console.log('Browser dist folder path:', browserDistFolder);

const app = express();
const angularApp = new AngularNodeAppEngine();

// API test
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Server is running',
    serverPath: serverDistFolder,
    browserPath: browserDistFolder,
    currentDir: process.cwd(),
    environment: process.env['NODE_ENV'],
  });
});

// Logs all requests
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.path}`);
  next();
});

// Handle root path redirect with 301
app.get('/', (req, res) => {
  console.log(`🔄 Root path redirect → /ar`);
  res.redirect(301, '/ar');
});

// 🔥 INVALID URL REDIRECTS - MUST BE BEFORE STATIC FILES AND SSR
// Handle specific invalid patterns that are being indexed

// 1. Handle the exact pattern you mentioned
app.get('/projects-details/services-details/:id', (req, res) => {
  console.log(
    `🔄 Redirecting invalid pattern: ${req.originalUrl} → /ar/services-details/${req.params.id}`
  );
  res.redirect(301, `/ar/services-details/${req.params.id}`);
});

// 2. Handle projects-details without language prefix
app.get('/projects-details/:id', (req, res) => {
  console.log(
    `🔄 Redirecting missing language: ${req.originalUrl} → /ar/projects-details/${req.params.id}`
  );
  res.redirect(301, `/ar/projects-details/${req.params.id}`);
});

// 3. Handle services-details without language prefix
app.get('/services-details/:id', (req, res) => {
  console.log(
    `🔄 Redirecting missing language: ${req.originalUrl} → /ar/services-details/${req.params.id}`
  );
  res.redirect(301, `/ar/services-details/${req.params.id}`);
});

// 4. Handle blogs without language prefix
app.get('/blogs/:id', (req, res) => {
  console.log(
    `🔄 Redirecting missing language: ${req.originalUrl} → /ar/blogs/${req.params.id}`
  );
  res.redirect(301, `/ar/blogs/${req.params.id}`);
});

// 5. Handle any assets requests (since you don't have assets folder)
app.get('/assets/*', (req, res) => {
  console.log(
    `🔄 Redirecting invalid assets request: ${req.originalUrl} → /ar`
  );
  res.redirect(301, '/ar');
});

// 6. Handle specific invalid URLs mentioned in examples
app.get('/about-us/contact-us', (req, res) => {
  console.log(
    `🔄 Redirecting specific invalid URL: ${req.originalUrl} → /ar/contact-us`
  );
  res.redirect(301, '/ar/contact-us');
});

app.get('/about-us/blogs/*', (req, res) => {
  const blogPath = req.path.replace('/about-us/blogs/', '');
  console.log(
    `🔄 Redirecting invalid blog URL: ${req.originalUrl} → /ar/blogs/${blogPath}`
  );
  res.redirect(301, `/ar/blogs/${blogPath}`);
});

// 7. Handle invalid URLs based on public folder structure
// These are URLs that Google is indexing based on folder names in /public
app.get('*', (req, res, next) => {
  const path = req.path;

  // List of known invalid patterns from public folder structure
  const invalidPatterns = [
    '/about-us-page',
    '/about-us',
    '/contact_us_page',
    '/contact-us',
    '/contactus',
    '/projects-page',
    '/services-page',
    '/details',
    '/DownloadSection',
    '/footer',
    '/hero',
    '/my-fav.ico',
    '/national-day-img',
    '/not-found',
    '/see_more',
    '/social_media_icons',
    '/svgs',
    '/fonts',
    '/images',
  ];

  // Check if the path starts with any invalid pattern
  const isInvalidPattern = invalidPatterns.some((pattern) => {
    return path.startsWith(pattern) || path === pattern;
  });

  // Also check if path doesn't start with valid language codes and isn't a static file
  const startsWithValidLang = path.startsWith('/ar') || path.startsWith('/en');
  const isStaticFile = /\.[a-zA-Z0-9]+$/.test(path);
  const isApiRoute = path.startsWith('/api');

  if (
    isInvalidPattern &&
    !startsWithValidLang &&
    !isStaticFile &&
    !isApiRoute
  ) {
    console.log(
      `🔄 Redirecting invalid public folder pattern: ${req.originalUrl} → /ar`
    );
    res.redirect(301, '/ar');
    return;
  }

  // Continue to next handler if this is a valid route
  next();
});

// This catches URLs like /projects-details/... /blogs-details/... etc.
app.get(/^\/([^\/]+)\/(.*)$/, (req, res, next) => {
  const firstSegment = req.params[0];
  const restOfPath = req.params[1];

  // Check if first segment is NOT a valid language
  if (!['ar', 'en'].includes(firstSegment)) {
    // Check if it's one of the known invalid patterns
    if (['services-page', 'projects-page', 'assets'].includes(firstSegment)) {
      console.log(
        `🔄 Redirecting invalid language pattern: ${req.originalUrl} → /ar/${restOfPath}`
      );
      res.redirect(301, `/ar/${restOfPath}`);
      return;
    }
  }

  // If it's a valid pattern, continue to next handler
  next();
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

app.use((req, res, next) => {
  const isStaticFile = /\.[a-zA-Z0-9]+$/.test(req.path);
  if (isStaticFile) {
    console.log(`❌ Static file not found: ${req.path}`);
    console.log(`🔄 Static file not found, permanent redirect → /ar`);
    return res.redirect(301, '/ar');
  }
  next();
});

/**
 * Handle not found routes with a permanent redirect to home
 */
app.use('*', async (req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  console.log(`SSR: ${req.originalUrl}`);
  try {
    const response = await angularApp.handle(req);
    if (response) {
      return writeResponseToNodeResponse(response, res);
    }
    // No response means route not found - permanent redirect to home
    console.log(`🔄 Route not found, permanent redirect → /ar`);
    return res.redirect(301, '/ar');
  } catch (err) {
    console.error('SSR Error:', err);
    console.log(`🔄 Error occurred, permanent redirect → /ar`);
    return res.redirect(301, '/ar');
  }
});


// // Last fallback
// app.use((req, res) => {
//   console.log(`🔄 Fallback redirect → /ar`);
//   return res.redirect(301, '/ar');
// });

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = Number(process.env['PORT']) || 6000;
  const host = process.env['HOST'] || '0.0.0.0';

  app.listen(port, host, () => {
    console.log(`
🚀 Angular SSR Server Started
────────────────────────────────
🧠 Node Version   : ${process.version}
⚙️  Environment   : ${process.env['NODE_ENV'] || 'undefined'}
📦 PM2 Mode       : ${process.env['exec_mode'] || 'standalone'}
🔢 PM2 Instance   : ${process.env['pm_id'] ?? 'N/A'}
📡 Listening On   : http://${host}:${port}
────────────────────────────────
    `);
  });
}

export const reqHandler = createNodeRequestHandler(app);
