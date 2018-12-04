var SpotifyWebApi = require('spotify-web-api-node')
const express = require('express')
const router = express.Router()

var playlistArtist = []
var playlistTracks = []

var clientId = '5a4842ba39bd45a5b95f9b12f7be1a54',
    clientSecret = '92cef8bf488d4f6d995ab69f7e4f3c7b';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});

router.get('/playlist', (req, res, next) => {
  res.send(playlistTracks)
})

router.get('/', (req, res, next) => {
    const {search} = req.query
    if(search){
        spotifyApi.searchArtists(search)
        .then( data => {
        let artists = data.body.artists.items
        // res.send(artists[0])
        // res.redirect(`/rutascarlos/relatedArtists/${artists[0].id}`)
        // relatedArtists(artists[0])
        buildPlaylist(artists[0])
        .then(result=>{
          // console.log(result)
          res.redirect(`/rutascarlos/playlist`)
        })
        .catch( error => {
          console.log(error)
        })
        })
        .catch( error => {
            console.log(error)
        })
    } else{
        res.render('music/carlos/randj')
    }
})

//AUX FUNCTIONS
const buildPlaylist = artist => {
  return new Promise((resolve, reject) => {
    spotifyApi.getArtistRelatedArtists(artist.id)
    .then( data => {
        let related = data.body.artists
        related.forEach(function(art,idx,array){
          if(playlistArtist.indexOf(art) === -1){
            playlistArtist.push(artist.id)
            topTrack(art.id)
            if (idx === array.length - 1){
              resolve(playlistTracks);
            }
          }
        })
    })
    .catch( e => {
        res.send(e)
    })
  });
};

// Get artist top tracks
const topTrack = artist => {
  spotifyApi.getArtistTopTracks(artist, 'MX')
  .then(function(data) {
    // console.log(data.body);
    let tracks = data.body.tracks
    playlistTracks.push(tracks[2].id)
    }, function(err) {
    console.log('Something went wrong!', err);
  });
}

module.exports = router