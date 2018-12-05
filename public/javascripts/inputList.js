document.addEventListener('DOMContentLoaded', function() {
    console.log('setting localstorage');
    var token= document.getElementById('tokenBack').value
    var user_id= document.getElementById('idBack').value
    var photoUrl = document.getElementById('photoUrlBack').value
    var displayName = document.getElementById('displayNameBack').value

    document.getElementById('displayName').innerHTML=displayName;

    //aqui se guardo el accessToken en localstorage para usarlo en js normal
    window.localStorage.setItem('my_token',token)
    window.localStorage.setItem('id_spotify',user_id)
    window.localStorage.setItem('photoUrl',photoUrl)
    window.localStorage.setItem('displayName',displayName)

    var example = window.localStorage.getItem('displayName');
    console.log('ejemplo:',example)
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems,{
        data:{
            "san holo": null,
            "metallica": null,
            "jauz": null
        }
    });
});