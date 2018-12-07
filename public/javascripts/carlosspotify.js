document.addEventListener('DOMContentLoaded', () => {
  console.log('router.locals');
  //aquí se guardó el accessToken en localstorage para usarlo en js normal
  var token = window.localStorage.getItem('my_token')
  var user_id = window.localStorage.getItem('id_spotify')
  var tracksUris = []
  var button = document.querySelector('#musicnow')
  var playlistName = document.querySelector('.playlistName').innerHTML
  button.innerHTML = "Add to Spotify"
  button.addEventListener('click',()=>{
    console.log('Create playlist in Spotify profile')
    var jsonData = {
        name: playlistName,
        public: false,
        description: "Playlist created by Ran Dj create yours at https://ran-dj.herokuapp.com"
    }
    axios({
        method: 'post',
        url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
        data: jsonData,
        dataType: 'json',
        headers: {
            'Authorization' : 'Bearer '+ token,
            'Content-Type': 'application/json'
          }
        })
        .then(res => {

          var playlist_id = res.data.id
            //here i have to save the playlist
            const playlistOBj = {
                spotifyId : playlist_id,
                userId :  window.localStorage.getItem('id_spotify')
            }
            axios.post('http://localhost:3000/spotify/savePlaylist',playlistOBj)
                .then(result => console.log(result))
                .catch(e => console.log(e))
          tracksUris = []
          document.querySelectorAll('.track').forEach(function(track,idx,array){
            tracksUris.push(track.innerHTML)
            if (idx === array.length - 1){
              addTracks(playlist_id, tracksUris);
            }
          });
        })
        .catch(err => console.log(err))
  })

  const addTracks = (playlist_id, tracksUris) => {
    var jsonData = {
      uris:tracksUris
  }
    axios({
      method: 'post',
      url: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`,
      data: jsonData,
      dataType: 'json',
      headers: {
          'Authorization' : 'Bearer '+ token,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        console.log(res)
        var container = document.querySelectorAll('#container')
        container.innerHTML = ''
        var openPlaylistUrl = `http://open.spotify.com/user/${user_id}/playlist/${playlist_id}`
        var listenNow = document.createElement('a');
        var carousel = document.querySelector('#musicnow-container')
        carousel.appendChild(listenNow)
        listenNow.setAttribute('href', openPlaylistUrl)
        listenNow.innerHTML = "Listen NOW!"
        // addCover(playlist_id)
      })
      .catch(err => console.log(err))
  }

  // const addCover = playlist_id => {
  //   axios({
  //     method: 'put',
  //     url: `https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/images`,
  //     data: cover,
  //     dataType: 'json',
  //     headers: {
  //         'Authorization' : 'Bearer '+ token,
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(err => console.log(err))
  // }
}, false);