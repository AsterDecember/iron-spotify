

document.addEventListener('DOMContentLoaded', () => {

    console.log('setting localstorage');

    var token= document.getElementById('token').value
    var user_id= document.getElementById('id').value
    console.log(token)
    console.log(user_id)
    //aqui se guardo el accessToken en localstorage para usarlo en js normal
    //window.localStorage.setItem('my_token',token)
    //window.localStorage.setItem('id_spotify',user_id)

    /*axios.get('http://localhost:3000/spotify/axios')
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });*/
    var button = document.getElementById('go')
    /*button.addEventListener('click',()=>{
        console.log('post axios spotify')
        /*axios.post(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
            headers: {
                Authorization : "Bearer"+token,
                'Content-Type': "application/json"
            },
            data:{
                "name": "New Playlist",
                "description": "New playlist description"
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            */
/*
        var jsonData = {
            name: "playlist example",
            public: false,
            description: "New playlist description"
        }
        axios({
            method: 'post',
            url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
            data: jsonData,
            dataType: 'json',
            headers: {
                'Authorization' : 'Bearer '+token,
                'Content-Type': 'application/json'
            }
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    })

*/
}, false);