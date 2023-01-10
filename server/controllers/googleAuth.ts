import User from '../models/userModel';
require('dotenv').config();
import passport from 'passport';
import oauth from 'passport-google-oauth2';

const GoogleStrategy = oauth.Strategy;

passport.use(new GoogleStrategy({
    clientID: "1090133496560-3usjh34jqabb14qlu9q9iops41b6rguk.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
},
function(request: Request, accessToken: any, refreshToken: any, profile: any, done: any) {
    console.log(profile);
    User.findOne({ userId: profile.id }, { upsert: true }, function (err: any, user: object) {
    return done(err, user);
    })
    }
));

// used to serialize the user for the session
passport.serializeUser(function(user: any, done) {
    done(null, user.id); 
   // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err: any, user: any) {
        done(err, user);
    });
});