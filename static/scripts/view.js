// Functionality for creating dynamic page views

var renderAPI = {
    renderTrendingCarousel: function(data) {
        console.log("Rendering trending carousel...");
        for (let ani in data) {
            console.log(data[ani]);
            let currAni = data[ani];
            $('<div/>', {
                class: "carousel-item",
                html: $('<div/>', {
                    class: "mainview",
                    html: `                                         \
                        <div class="img">                           \
                            <img src="${currAni['animeImg']}">      \
                        </div>                                      \
                        <p>${currAni['animeTitle']}</p>             \
                    `
                }),
                click: () => {
                    searchAPI.openAnime(currAni);
                }
            }).appendTo('.carousel');
        }

    },
    renderAnimeGallery: function(data) {
        if (!localStorage.getItem("searchName")) {
            console.log("No anime searched!");
            location.replace("index.html");
        }
        console.log("Rendering anime gallery...");
        $('#result-header').text(`Search Results: ${localStorage.getItem("searchName")}`);
        for (let ani in data) {
            console.log(data[ani]);
            let currAni = data[ani];
            $('<div/>', {
                class: "imggall",
                html: `
                <div class="img">                           \
                    <img src="${currAni['animeImg']}">      \
                </div>                                      \
                <h4>${currAni['animeTitle']}</h4>           \
                `,
                click: () => {
                    searchAPI.openAnime(currAni);
                }
            }).appendTo('.gallery');
        }
    },
    renderAnimePage: function(data) {
        if (!localStorage.getItem("openAnime")) {
            console.log("No anime opened!")
            location.replace("index.html");
        }

        console.log("Rendering anime page...");
        console.log(localStorage.getItem("openAnime"));

        let ani = JSON.parse(localStorage.getItem("openAnime"));
        let aniDetails = JSON.parse(localStorage.getItem("openAnimeDetails"));
        const aniImg = aniDetails.animeImg
        const title = ani.animeTitle;
        const synopsis = aniDetails.synopsis;
        let eps = aniDetails.episodesList;

        $('.title').text(title);
        $('#ani-description').text(synopsis);
        $('#ani-image').attr("src", aniImg)
        
        for (let ep in eps) {
            let currEp = eps[ep];
            let buttEp = $('<button/>', {
                text: `${currEp.episodeNum}`,
                id: `${currEp.episodeId}`,
                click: (e) => {
                    alert("calling renderAnimeStream with episode id" + currEp.episodeId);
                },
            });
            buttEp.prependTo('.ep');
        }
    },
    renderAnimeStream: function(episodeId) {
        // TODO: implement cosumnet API for better streaming
        // https://docs.consumet.org/#tag/gogoanime/operation/getRecentEpisodes
        const streamingURL = `https://api.consumet.org/anime/gogoanime/watch/${episodeId}`;
            fetch(streamingURL)
            .then((response) => response.json())
            .then((data) => {
                
            });
    }
}


/* Event listeners */
// Listener for carousel button interaction
// Concept: gets width of carousel item, sets scrollLeft to increment/decrement by width
$('.sub-content button').click((e) => {
    // temporarily disable snapping and button
    $('.carousel').css("scroll-snap-type","none");

    let item_width = $('.carousel-item').width() + 44;

    step = 2;
    speed = 5;
    scrollAmount = 0;
    var scrollTimer = setInterval(function(){
        let currScroll = $('.carousel').scrollLeft();
        console.log(scrollAmount);
        if(e.target.id === "left-carousel"){
            $('.carousel').scrollLeft(currScroll -= step);
        } else {
            $('.carousel').scrollLeft(currScroll += step);
        }
        scrollAmount += step;
        if(scrollAmount >= item_width){
            window.clearInterval(scrollTimer);
            // reenable snapping
            $('.carousel').css("scroll-snap-type","x mandatory");
        }
    }, speed);
});


/*
<div class="carousel-item">
    <div class="mainview">
        <div class="img">
            <img src="https://i.pinimg.com/originals/4c/3d/14/4c3d14aac7a9ea327d0a080c8c2a1278.jpg">
        </div>
        <p>TITLE</p>
    </div>
</div>
*/