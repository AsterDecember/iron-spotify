const BASE_URL = 'https://api.spotify.com/v1/'

// var searchAlbums = function (query) {
//   $.ajax({
//       url: 'https://api.spotify.com/v1/search',
//       data: {
//           q: query,
//           type: 'artist'
//       },
//       success: function (response) {
//           resultsPlaceholder.innerHTML = template(response);
//       }
//   });
// };

const searchArtist = query => {
  const body = {
    q: query,
    type: 'artist'
  }
  axios.get(BASE_URL + 'search', body)
    .then(result=>{
      console.log(result)
    })
    .catch(err=>console.log(err))
}

//Search Artist
document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();
  searchArtist(document.getElementById('artist').value);
}, false);