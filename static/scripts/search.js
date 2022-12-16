// Functionality for implementing the anime search and interface with
// the GoGoAnime API

// Note: Use localstorage to cache anime results

// Collections of GoGoAnime API functionality for searching anime
let searchAPI = { 
    searchAnime: function(searchTerms) {    // Function for redirecting on anime search
        fetch(`https://gogoanime.consumet.org/search?keyw=${searchTerms}`)
        .then((response) => response.json())
        .then((animelist) => {
            console.log("Searching anime...");
            localStorage.setItem("searchAnime", JSON.stringify(animelist));
            window.location.href = "gallery.html";
        });
    },
    openAnime: function(data) {    // Function for redirecting to specific anime JSON object
        console.log("Opening anime...");
        localStorage.setItem("openAnime", JSON.stringify(data));
        window.location.href = "anime.html"
    },
    getSearchAnime: function() {    // Function for getting searched anime data
        data = localStorage.getItem("searchAnime");
        if (data != null) {
            data = JSON.parse(data);
        }
        return data;
    },
    getPopular: function() {
        data = localStorage.getItem("popularAnime");
        if (data === null) {
            fetch("https://gogoanime.consumet.org/popular")
            .then((response) => response.json())
            .then((animelist) => {
                localStorage.setItem("popularAnime", JSON.stringify(animelist));
            });
        }
        return JSON.parse(data);
    },
    getRandom: function() {
        animelist = this.getPopular();
        if (animelist) {
            num_anime = Object.keys(animelist).length;
            console.log(animelist);
            return animelist[Math.floor(Math.random() * num_anime)];
        }
        return undefined;
    },
    getAnimeDetails: function(animeID) {
        fetch(`https://gogoanime.consumet.org/anime-details/${animeID}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        });
    },
}

// Search handler
$('#search').submit(e => {
    e.preventDefault();
    const searchInput = $('#anime-search').val();
    searchAPI.searchAnime(searchInput);
    return false;
});

// Random anime handler