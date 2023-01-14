import User from '../models/userModel';
require('dotenv').config();
import passport from 'passport';
import oauth from 'passport-google-oauth2';

const GoogleStrategy = oauth.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
    },
    function (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      done(null, profile);
    }
  )
);

// used to serialize the user for the session
passport.serializeUser(function (user: any, done) {
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (user: any, done) {
  done(null, user);
});
