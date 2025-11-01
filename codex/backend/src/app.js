const express = require('express');
require('dotenv').config();
const cors = require('cors');
const supabase = require('./config/db')
const app = express();

app.use(cors({
  origin: [
    "https://code-x-pawm-s49d.vercel.app",
    "https://code-x-pawm.vercel.app" 
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

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

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

      res.redirect(`https://code-x-pawm.vercel.app/?token=${token}`);
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