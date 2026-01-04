const express = require('express');
require('dotenv').config();
const cors = require('cors');
const supabase = require('./config/db')
const app = express();

app.use(cors({
  origin: [
    "https://code-x-pawm-s49d.vercel.app",
    "https://code-x-pawm.vercel.app",
    /^exp:\/\/.*/, // Allow Expo development
    /^codex:\/\/.*/, // Allow custom scheme for production
    "http://localhost:19000", // Expo web
    "http://localhost:19006", // Expo web alternative
  ],
  credentials: true
}));

app.use(express.json());

const passport = require('./auth/google');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const progressRouter = require('./routes/progress');
const PORT = process.env.PORT || 3001;

app.use(session({
  secret: process.env.SESSION_SECRET || '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',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/progress', progressRouter);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.get('/auth/google', (req, res, next) => {
  // Store redirect_uri from query param to session
  if (req.query.redirect_uri) {
    req.session.redirect_uri = req.query.redirect_uri;
  }
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    try {
      console.log('Authenticated user:', JSON.stringify(req.user, null, 2));
      
      if (!req.user || !req.user.id) {
        console.error('User authentication failed - no user data');
        return res.redirect('https://code-x-pawm.vercel.app/login?error=auth_failed');
      }

      const token = jwt.sign(
        {
          id: req.user.id,
          email: req.user.email,
          name: req.user.name,
          profileImg: req.user.picture || req.user.profileImg || (req.user.photos && req.user.photos[0]?.value) || null,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Get redirect_uri from query params or session
      // Mobile app will send redirect_uri like: exp://192.168.1.x:19000/--/auth/callback
      const redirectUri = req.query.redirect_uri || req.session?.redirect_uri || 'https://code-x-pawm.vercel.app/';
      
      // Clear redirect_uri from session after use
      if (req.session?.redirect_uri) {
        delete req.session.redirect_uri;
      }
      
      // Validate redirect URI to prevent open redirect vulnerabilities
      const isValidRedirectUri = (uri) => {
        try {
          const url = new URL(uri);
          // Allow only specific schemes and domains
          const allowedPatterns = [
            /^https:\/\/(code-x-pawm-s49d\.vercel\.app|code-x-pawm\.vercel\.app)(\/.*)?$/,
            /^exp:\/\/.*/, // Expo development
            /^codex:\/\/.*/, // Custom scheme for production
            /^http:\/\/localhost:(19000|19006)(\/.*)?$/, // Expo web
          ];
          
          const uriToCheck = url.toString();
          return allowedPatterns.some(pattern => pattern.test(uriToCheck));
        } catch {
          return false;
        }
      };
      
      // Parse redirect URI to append token properly
      try {
        if (!isValidRedirectUri(redirectUri)) {
          console.warn('Redirect URI not in allowlist:', redirectUri);
          // Fallback to default for security
          res.redirect(`https://code-x-pawm.vercel.app/?token=${token}`);
          return;
        }
        
        const url = new URL(redirectUri);
        url.searchParams.append('token', token);
        res.redirect(url.toString());
      } catch (urlError) {
        // If URL parsing fails (invalid redirect_uri), fallback to default
        console.error('Invalid redirect_uri:', redirectUri, urlError);
        res.redirect(`https://code-x-pawm.vercel.app/?token=${token}`);
      }
    } catch (error) {
      console.error('Error in auth callback:', error);
      res.redirect('https://code-x-pawm.vercel.app/login?error=server_error');
    }
  }
);

// ⚠️ PENTING: Error handler harus di paling akhir, setelah semua routes!
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.listen(PORT, () => console.log(`Backend running on ${PORT}`));