

document.addEventListener('DOMContentLoaded', () => {

    console.log('router.locals');

    var token= document.getElementById('token').value
    console.log(token)
    window.localStorage.setItem('my_token',token)

}, false);