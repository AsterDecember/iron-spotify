

document.addEventListener('DOMContentLoaded', () => {

    console.log('router.locals');

    var token= document.getElementById('token').value
    console.log(token)
    //aqui se guardo el accessToken en localstorage para usarlo en js normal
    window.localStorage.setItem('my_token',token)

}, false);