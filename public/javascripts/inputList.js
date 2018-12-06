document.addEventListener('DOMContentLoaded', function() {
    console.log('setting localstorage');
    var token= document.getElementById('tokenBack').value
    var refreshToken= document.getElementById('refreshTokenBack').value
    var user_id= document.getElementById('idBack').value
    var photoUrl = document.getElementById('photoUrlBack').value
    var displayName = document.getElementById('displayNameBack').value

    document.getElementById('displayName').innerHTML=displayName;

    //aqui se guardo el accessToken en localstorage para usarlo en js normal
    window.localStorage.setItem('my_token',token)
    window.localStorage.setItem('id_spotify',user_id)
    window.localStorage.setItem('photoUrl',photoUrl)
    window.localStorage.setItem('displayName',displayName)
    window.localStorage.setItem('refreshToken',refreshToken)
    //get refresh token
    /*axios({
        method: 'get',
        url: "https://accounts.spotify.com/api/token",
        data: {
            "grant_type":    "refresh_token",
            "refresh_token":  refreshToken,
            "redirect_uri":  myurl,
            "client_secret": mysecret,
            "client_id":     myid,
        }
        })
        .then(result => console.log(result))
        .catch(e => console.log(e))*/
    var elems = document.querySelectorAll('.autocomplete1');
    var elems2 = document.querySelectorAll('.autocomplete2');
    //const names = {}
    let data = axios({
        method: 'get',
        url: `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=100&offset=5`,
        dataType: 'json',
        headers: {
            'Authorization' : 'Bearer '+ token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => {
            console.log(res.data.items)
            console.log(res)
            let data = {}
            const {items} = res.data
            items.forEach((item)=> {
                data[item.name] = null;
            })
            console.log(data)
            var instances = M.Autocomplete.init(elems,{data});
            return data

            //console.log(items)
            })
        .catch(err => console.log(err))

    //get top tracks
    axios({
        method: 'get',
        url: `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=100&offset=5`,
        dataType: 'json',
        headers: {
            'Authorization' : 'Bearer '+ token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => {
            console.log(res.data.items)
            console.log(res)
            let data = {}
            const {items} = res.data
            items.forEach((item)=> {
                data[item.name] = null;
            })
            console.log(data)
            var instances = M.Autocomplete.init(elems,{data});
            return data

            //console.log(items)
        })
        .catch(err => console.log(err))

});