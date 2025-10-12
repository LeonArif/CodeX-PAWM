const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { createUser, getUserByGoogleid, getUserById } = require('../models/user'); // <--- LOWERCASE id

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log("Google profile:", profile); // LOG PROFILE
    let user = await getUserByGoogleid(profile.id); // <--- LOWERCASE id
    console.log("Existing user:", user); // LOG USER
    if (!user) {
      user = await createUser({
        googleid: profile.id, // <--- LOWERCASE id
        email: profile.emails[0].value,
        name: profile.displayName,
        password: null // Kosongkan password untuk user Google
      });
      console.log("Inserted user:", user); // LOG INSERTED USER
    }
    return done(null, user);
  } catch (err) {
    console.error("GoogleStrategy error:", err); // LOG ERROR
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user && user.id ? user.id : null);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;