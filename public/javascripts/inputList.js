document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, {
        data:{
            "san holo": null,
            "metallica": null,
            "jauz": null
        }
    });
});