const passport = require("passport");
const User = require("../models/User");
const FacebookStrategy = require("passport-facebook");
const SpotifyStrategy = require('passport-spotify').Strategy;


//local
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//serialize for spotify
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


//Spotify login
passport.use(
    new SpotifyStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/callback'
        },
        function(accessToken, refreshToken, expires_in, profile, done) {
            User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
                return done(err, user);
            });
        }
    )
);



module.exports = passport;
