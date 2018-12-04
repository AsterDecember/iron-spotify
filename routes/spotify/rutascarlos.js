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
  // res.send(playlistTracks)
  //Aux used to pass tracks list to template and then clean it
  var auxTracks = playlistTracks
  res.render('music/carlos/playlist',{auxTracks})
  //Reset for a clean playlist
  playlistTracks = []
  playlistArtist = []
})

router.get('/', (req, res, next) => {
    const {search1, search2, search3} = req.query
    // const {search3} = req.query
    var search = search2
    if(search){
        spotifyApi.searchArtists(search)
        .then( data => {
        let artists = data.body.artists.items
        buildPlaylist(artists[0])
        .then(result=>{
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
        related.push(artist)
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
    // playlistTracks.push(tracks[2].uri)
    playlistTracks.push(
      {
        name:tracks[2].name,
        uri:tracks[2].uri,
        artists:tracks[2].artists
      }
    )
    }, function(err) {
    console.log('Something went wrong!', err);
  });
}

module.exports = router