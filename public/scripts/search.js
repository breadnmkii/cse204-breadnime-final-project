"use strict";
// Functionality for anime searching interface powered by the Consumet api
Object.defineProperty(exports, "__esModule", { value: true });
const extensions_1 = require("@consumet/extensions");
const API_ENDPOINT = new extensions_1.ANIME.Gogoanime();
const results = API_ENDPOINT.search("One Piece").then(data => {
    // print results
    console.log(data);
});
alert("script");
