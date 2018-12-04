const router = require("express").Router();
const User = require("../../models/User");
const passport = require("passport");
var SpotifyWebApi = require('spotify-web-api-node');


var spotifyApi = new SpotifyWebApi({
    clientId : process.env.CLIENT_ID,
    clientSecret : process.env.CLIENT_SECRET
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
    .then(function(data) {
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
        console.log('Something went wrong when retrieving an access token', err);
    });


function ensureAuthenticated(req, res, next) {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

router.get('/',(req,res)=>{
    console.log(req.app.locals.user)
    //aqui se guardo el usuario en locals para su uso
    const user = req.app.locals.user
    console.log('usuario:-------',user)
    res.render('music/spotify/index',{user});
})

router.get('/me',(req,res)=>{
    console.log('Accesss------:',req.app.locals.user.accessToken)
    spotifyApi.setAccessToken(req.app.locals.user.accessToken)
    spotifyApi.getMe()
        .then(function(data) {
            console.log('Some information about this user', data.body);
        }, function(err) {
            console.log('Something went wrong!', err);
        });
})

/*router.get('/login', function(req, res) {
    var scopes = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + process.env.CLIENT_ID +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(process.env.URI));
});*/



/*then(token => {
    req.app.locals.tokenSpoity = token
})*/

router.get('/getCode', function (req,res) {
    const code = req.params
})

router.get('/artist',(req,res)=>{
    const {artist} = req.query
    console.log(artist)
    spotifyApi.searchArtists(artist)
        .then(data => {
            console.log(data.body.artists.items[0].images[0])
            let artist = data.body.artists.items
            res.render('music/spotify/searchArtist',{artist})
        })
        .catch(err => console.log(err))

})

router.get('/searchAlbum/:id',(req,res)=>{
    const {id} = req.params
    console.log(id)
    spotifyApi.getArtistAlbums(id).then(
        function(data) {
            let albums = data.body.items

            res.render('albumDetail',{albums})
        },
        function(err) {
            console.error(err);
        })
})

router.get('/getTracks/:id',(req,res)=>{
    const {id} = req.params

    spotifyApi.getAlbumTracks(id, { limit : 5, offset : 1 })
        .then(function(data) {
            console.log(data.body);
            let tracks = data.body.items
            res.json({tracks})
        }, function(err) {
            console.log('Something went wrong!', err);
        });
})

router.get('/axios',(req,res) => {
    res.json(req.app.locals.user)
})
module.exports = router
