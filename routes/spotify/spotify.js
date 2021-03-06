const router = require("express").Router();
const User = require("../../models/User");
const passport = require("passport");
const Playlist = require('../../models/Playlist')


function ensureAuthenticated(req, res, next) {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

//this route saves playlist
router.post('/savePlaylist',(req,res,next)=>{
    console.log('info de lo que se guarda en la db',req.body)
    const playlist = req.body
    Playlist.create(playlist)
        .then(result => {
            console.log('Se guardo la playlit!!!---------------////')
            console.log(result)
            console.log(req.app.locals.user)
            User.findByIdAndUpdate(req.app.locals.user._id,{
                $push: {
                    playlists: result._id
                }

            })
                .then(result => console.log('exito',result))
                .catch(e => console.log(e))

        })
        .catch(e => console.log(e))
})


router.get('/',(req,res)=>{
    //console.log(req.app.locals.user)
    //aqui se guardo el usuario en locals para su uso
    const user = req.app.locals.user
    console.log('usuario:-------',user)
    res.render('music/spotify/index',{user});
})

//never works
/*router.get('/me',(req,res)=>{
    console.log('Accesss------:',req.app.locals.user.accessToken)
    spotifyApi.setAccessToken(req.app.locals.user.accessToken)
    spotifyApi.getMe()
        .then(function(data) {
            console.log('Some information about this user', data.body);
        }, function(err) {
            console.log('Something went wrong!', err);
        });
})*/

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


router.get('/carlos',(req,res)=>{
    res.redirect('/rutascarlos')
})
router.get('/axios',(req,res) => {
    res.json(req.app.locals.user)
})
module.exports = router
