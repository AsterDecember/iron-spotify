document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
    console.log(window.location.href)
    var location = true
    if(window.location.href === 'http://localhost:3000/'){
         location = false
    }
});