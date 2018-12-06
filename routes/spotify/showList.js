var SpotifyWebApi = require('spotify-web-api-node')
const express = require('express')
const router = express.Router()

router.get('/',(req,res,next)=>{
    console.log(req.app.locals.user)
    const {playlists} = req.app.locals.user
    console.log(playlists)
    res.render('music/spotify/playlists',{playlists})
})


module.exports = router