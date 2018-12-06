var SpotifyWebApi = require('spotify-web-api-node')
const express = require('express')
const router = express.Router()
const User = require('../../models/User')


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


router.get('/:id',async (req,res,next)=>{
    const {id}=req.params
    //this is a playlist id
    console.log(id)

    try {
        const data = await spotifyApi.getPlaylist(id)
        const auxTracks = data.body.tracks.items
        if(auxTracks){
            res.render('music/spotify/playlistDetail',{auxTracks})
            // res.send(auxTracks)
        }
        else res.send(error)
    } catch (error) {
        console.log(error)
    }

})

router.get('/',(req,res,next)=>{

    User.findById(req.app.locals.user._id).populate('playlists')
        .then(user =>{
            console.log('usuario populated:',user)
            res.render('music/spotify/playlists',{user})
        })
    //console.log('playlist info',playlists)

})



module.exports = router