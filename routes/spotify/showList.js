var SpotifyWebApi = require('spotify-web-api-node')
const express = require('express')
const router = express.Router()

router.get('/:id',(req,res,next)=>{
    const {id}=req.params
    //this is a playlist id
    console.log(id)

    //TODO: Print info from spotify about playlist


    res.render('music/spotify/playlistDetail')
})

router.get('/',(req,res,next)=>{
    console.log(req.app.locals.user)
    const {playlists} = req.app.locals.user
    console.log(playlists)
    res.render('music/spotify/playlists',{playlists})
})



module.exports = router