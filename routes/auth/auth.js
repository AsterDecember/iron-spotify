const router = require("express").Router();
const User = require("../../models/User");
const passport = require("passport");

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

//-------------------- PASSPORT SPOTIFY-------------------
// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this application at /auth/spotify/callback
router.get(
    '/login',
    passport.authenticate('spotify', {
        scope: ['user-read-email', 'user-read-private', 'playlist-modify-public', 'playlist-modify-private', 'user-top-read'],
        showDialog: true
    }),
    function(req, res) {
        // The request will be redirected to spotify for authentication, so this
        // function will not be called.
    }
);

// GET /auth/spotify/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
    '/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    function(req, res) {
        console.log(req.isAuthenticated());
        req.app.locals.user = req.user
        console.log(req.user)
        //console.log(req.app.locals.user)
        res.redirect('/createList');
    }
);

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



module.exports = router;