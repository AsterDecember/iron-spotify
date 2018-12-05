document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('displayName').innerHTML = window.localStorage.getItem('displayName');
    document.getElementById('photoSpotify').src = window.localStorage.getItem('photoUrl');

});