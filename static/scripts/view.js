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
        /*
        <div class="imggall">
            <img src="https://i.pinimg.com/originals/4c/3d/14/4c3d14aac7a9ea327d0a080c8c2a1278.jpg">
            <h4>TITLE</h4>
        </div>
        */
    },
    renderAnimeStream: function(data) {

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
})

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