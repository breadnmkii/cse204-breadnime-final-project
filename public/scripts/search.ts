// Functionality for anime searching interface powered by the Consumet api

import { ANIME } from '@consumet/extensions'

const API_ENDPOINT = new ANIME.Gogoanime();

const results = API_ENDPOINT.search("One Piece").then(data => {
    // print results
    console.log(data);
})

alert("script")