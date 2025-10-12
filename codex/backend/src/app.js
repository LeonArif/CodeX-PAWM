const express = require('express');
require('dotenv').config();
const cors = require('cors'); // <--- Import cors di atas

const app = express();

app.use(cors({ // <--- PAKAI DI PALING ATAS, SEBELUM ROUTE/MIDDLEWARE LAIN
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

const sequelize = require('./config/db');
const User = require('./models/user');
const Progress = require('./models/progress');
const passport = require('./auth/google');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const progressRouter = require('./routes/progress');

app.use(session({
  secret: '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',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/progress', progressRouter); // <--- setelah semua middleware

sequelize.sync().then(() => {
    app.listen(3001, () => console.log('Backend running on 3001'));
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        // Tambahkan foto profile, coba dua kemungkinan
        profileImg: req.user.picture || (req.user.photos && req.user.photos[0]?.value) || null,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.redirect(`http://localhost:5173/?token=${token}`);
  }
);