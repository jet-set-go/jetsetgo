import User from '../models/userModel';
require('dotenv').config();
import passport from 'passport';
import oauth from 'passport-google-oauth2';

const GoogleStrategy = oauth.Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
},
function (request: any, accessToken: any, refreshToken: any, profile: any, done: any) {
    console.log(profile);
    // User.findOne({ userId: profile.id }, { upsert: true }, function (err: any, user: object) {
    // return done(err, user);
    // })
    done(null, profile);
    }
));

// used to serialize the user for the session
passport.serializeUser(function(user: any, done) {
    done(null, user.id); 
   // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findOne({userId: id}, function(err: any, user: any) {
        done(err, user);
    });
});