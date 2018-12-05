

document.addEventListener('DOMContentLoaded', () => {
  console.log('router.locals');
  //aqui se guardo el accessToken en localstorage para usarlo en js normal
  var token = window.localStorage.getItem('my_token')
  var user_id = window.localStorage.getItem('id_spotify')
  var tracksUris = []
  var button = document.createElement('button')
  button.innerHTML = "Music NOW!"
  // button.innerHTML = user_id
  document.body.appendChild(button)
  button.addEventListener('click',()=>{
    console.log('post carlos axios spotify')
    var jsonData = {
        name: "Ran Dj Playlist",
        public: false,
        description: "Playlist curated by Ran Dj create yours at http://localhost:3000"
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
          console.log(res)
          var playlist_id = res.data.id
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
        // container.appendChild(listenNow);
        document.body.appendChild(listenNow)
        listenNow.setAttribute('href', openPlaylistUrl)
        listenNow.innerHTML = "Listen NOW!"
        // button.innerHTML = user_id
        // document.body.appendChild(button)
      })
      .catch(err => console.log(err))
  }
}, false);