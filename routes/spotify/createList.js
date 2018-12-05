var SpotifyWebApi = require('spotify-web-api-node')
const express = require('express')
const router = express.Router()

var playlistArtist = []
var playlistTracks = []

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

router.get('/playlist', (req, res, next) => {
    //Aux used to pass tracks list to template and then clean it
    var auxTracks = playlistTracks
    console.log(auxTracks)
    res.render('music/list',{auxTracks})
    //Reset for a clean playlist
    playlistTracks = []
    playlistArtist = []
})

router.get('/', (req, res, next) => {
    res.render('music/input')
})

router.post('/', async (req, res, next) => {
    const {search1, search2, search3} = req.body
    const search = search2
    console.log(search)
    try {
        const data = await spotifyApi.searchArtists(search)
        let artists = data.body.artists.items
        const result = await buildPlaylist(artists[0])
        console.log(result)
        if(result){
            // setTimeout(()=>res.redirect(`/rutascarlos/playlist`), 500)
            res.redirect(`/createList/playlist`)
        }
    } catch (error) {
        console.log(error)
    }
})

//AUX FUNCTIONS
const buildPlaylist =  artist => {
    return new Promise(async (resolve, reject) => {
        const data = await spotifyApi.getArtistRelatedArtists(artist.id)
        // console.log(data.body.artists)
        let related = [...data.body.artists, artist]
        related.forEach(async (art,idx,array) => {
            if(playlistArtist.indexOf(art) === -1){
                playlistArtist.push(art.id)
                const topT = await topTrack(art.id)
                playlistTracks.push(topT)
                if (idx === array.length - 1){
                    console.log('track',playlistTracks)
                    // console.log('arts',playlistArtist)
                    resolve(playlistTracks);
                }
            }
        })
    })
};

// Get artist top tracks
const topTrack = artist => {
    return new Promise(async (resolve, reject) => {
        const data = await spotifyApi.getArtistTopTracks(artist, 'MX')
        let tracks = data.body.tracks
        // playlistTracks.push(tracks[2].uri)
        var topT = {
            name:tracks[2].name,
            uri:tracks[2].uri,
            artists:tracks[2].artists
        }
        resolve(topT)
    })
}

module.exports = router