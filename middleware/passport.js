const passport = require("passport");
const User = require("../models/User");
const SpotifyStrategy = require('passport-spotify').Strategy;



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
            callbackURL: (process.env.URI || 'http://localhost:3000/auth/callback')
        },
        function(accessToken, refreshToken, expires_in, profile, done) {
            console.log('acces:',accessToken)
            console.log('refresh:',refreshToken)

            User.findOrCreate({ profile,accessToken,refreshToken}, function(err, user) {
                return done(err, user);
            });
        }
    )
);



module.exports = passport;
