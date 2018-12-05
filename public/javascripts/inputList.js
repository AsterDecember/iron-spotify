document.addEventListener('DOMContentLoaded', function() {
    console.log('setting localstorage');

    var token= document.getElementById('token').value
    var user_id= document.getElementById('id').value
    console.log(token)
    console.log(user_id)
    //aqui se guardo el accessToken en localstorage para usarlo en js normal
    window.localStorage.setItem('my_token',token)
    window.localStorage.setItem('id_spotify',user_id)

    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, {
        data:{
            "san holo": null,
            "metallica": null,
            "jauz": null
        }
    });
});