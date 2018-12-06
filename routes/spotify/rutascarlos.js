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
  res.render('music/carlos/playlist',{auxTracks})
  //Reset for a clean playlist
  playlistTracks = []
  playlistArtist = []
})

router.get('/', (req, res, next) => {
  res.render('music/carlos/randj')
})

//Search1 -> Artist
//Search2 -> Song
//Search3 -> Mood: [peda, workout, tranqui]
router.post('/', async (req, res, next) => {
  let query = 0
  const {search1, search2, search3} = req.body
  if(search1 && !search2) query = 1
  if(!search1 && search2) query = 2
  if(search1 && search2) query = 3
  switch(query) {
    case 1:
      console.log(search1)
      try {
        const data = await spotifyApi.searchArtists(search1)
        let artists = data.body.artists.items
        const result = await buildPlaylist(artists[0])
        console.log(result)
        if(result){
          // setTimeout(()=>res.redirect(`/rutascarlos/playlist`), 500)
          res.redirect(`/rutascarlos/playlist`)
        }     
      } catch (error) {
        console.log(error)
      }
    break;
    case 2:
      console.log(search2)
      // Search tracks whose name, album or artist contains search2 value
      try {
        const data = await spotifyApi.searchTracks(search2)
        let track = data.body.tracks.items[0]
        const result = await buildPlaylist(track.artists[0])
        playlistTracks.push(
          {
            name:track.name,
            uri:track.uri,
            artists:track.artists,
            album:track.album,
            preview_url:track.preview_url	
          }
        )
        // console.log(result)
        if(result){
          // setTimeout(()=>res.redirect(`/rutascarlos/playlist`), 500)
          res.redirect(`/rutascarlos/playlist`)
        }     
      } catch (error) {
        console.log(error)
      }
    break;
    case 3:
      console.log("query: " + search1 + " | " + search2)
      try {
        const resultByArtist = await searchByArtist(search1)
        const resultByTrack = await searchByTrack(search2)
        playlistTracks = await shuffle(playlistTracks)
        if(resultByTrack){
          // setTimeout(()=>res.redirect(`/rutascarlos/playlist`), 500)
          res.redirect(`/rutascarlos/playlist`)
        }     
      } catch (error) {
        console.log(error)
      }
    break;
    default:
      res.redirect(`/rutascarlos`)
    break;
  }
})

//AUX FUNCTIONS
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

const searchByArtist = async (search1) => {
  const data = await spotifyApi.searchArtists(search1)
  let artists = data.body.artists.items
  const result = await buildPlaylist(artists[0])
  return result
}

const searchByTrack = async (search2) => {
  const data = await spotifyApi.searchTracks(search2)
  let track = data.body.tracks.items[0]
  const result = await buildPlaylist(track.artists[0])
  return result
}

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
          // console.log('track',playlistTracks)
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
      artists:tracks[2].artists,
      album:tracks[2].album,
      preview_url:tracks[2].preview_url	
    }
    resolve(topT)
  })
}

module.exports = router