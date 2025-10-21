const express = require('express');
require('dotenv').config();
const cors = require('cors');
const supabase = require('./config/db')
const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://code-x-pawm-s49d.vercel.app"],
  credentials: true
}));

app.use(express.json());

const passport = require('./auth/google');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const progressRouter = require('./routes/progress');

app.use(session({
  secret: process.env.SESSION_SECRET || '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',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/progress', progressRouter);

app.listen(3001, () => console.log('Backend running on 3001'));

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

    res.redirect(`http://localhost:5173/?token=${token}`);
  }
);