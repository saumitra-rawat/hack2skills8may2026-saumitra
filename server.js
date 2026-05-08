import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust the App Engine proxy
app.set('trust proxy', 1);

// Security: Set secure HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "'unsafe-inline'", "https://maps.googleapis.com", "https://apis.google.com", "https://www.gstatic.com"],
      "img-src": ["'self'", "data:", "https://*.gstatic.com", "https://*.googleapis.com", "https://*.firebaseapp.com", "https://www.gstatic.com"],
      "connect-src": ["'self'", "https://*.googleapis.com", "https://*.firebaseio.com", "https://*.cloudfunctions.net", "https://identitytoolkit.googleapis.com", "https://*.firebaseapp.com"]
    },
  },
}));

// Security: Rate limiting to prevent brute-force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased limit for hackathon traffic
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Compress responses
app.use(compression());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Support client-side routing by serving index.html for all non-static requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
