document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('displayName').innerHTML = window.localStorage.getItem('displayName');
    document.getElementById('displayName').src = window.localStorage.getItem('displayName');

});