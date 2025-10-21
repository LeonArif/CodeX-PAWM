const express = require('express');
require('dotenv').config();
const cors = require('cors');
const supabase = require('./config/db')
const app = express();

app.use(cors({
  origin: ["https://code-x-pawm-s49d.vercel.app"],
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

app.listen(PORT, () => console.log(`Backend running on ${PORT}`));

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('Authenticated user:', JSON.stringify(req.user, null, 2)); // kalau mau debug
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

    res.redirect(`https://code-x-pawm-s49d.vercel.app/?token=${token}`);
  }
);