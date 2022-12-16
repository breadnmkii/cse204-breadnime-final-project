// Functionality for creating dynamic page views

var renderAPI = {
    renderTrendingCarousel: function(data) {
        console.log("Rendering trending carousel...");
        console.log(data);
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
                    alert(`u clicked on ${currAni['animeTitle']}`);
                    searchAPI.openAnime(currAni);
                }
            }).appendTo('.carousel');
        }

    },
    renderAnimeGallery: function(data) {

    },
    renderAnimeStream: function(data) {

    }
}


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