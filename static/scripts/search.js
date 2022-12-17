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
    openAnime: async function(data) {    // Function for redirecting to specific anime JSON object
        console.log("Opening anime...");
        let animeDetails = await this.getAnimeDetails(data.animeId);
        localStorage.setItem("openAnime", JSON.stringify(data));
        localStorage.setItem("openAnimeDetails", JSON.stringify(animeDetails));
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
            this.openAnime(animelist[Math.floor(Math.random() * num_anime)]);
        }
        return undefined;
    },
    getAnimeDetails: async function(animeID) {
        let animeDetails_res = fetch(`https://gogoanime.consumet.org/anime-details/${animeID}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        });
        
        return animeDetails_res;
    },
}

// Search handler
$('#search').submit(e => {
    e.preventDefault();
    const searchInput = $('#anime-search').val();
    searchAPI.searchAnime(searchInput);
    localStorage.setItem("searchName", searchInput);
    return false;
});

// Random anime handler
$('.rando').click(() => {
    searchAPI.getRandom();
});