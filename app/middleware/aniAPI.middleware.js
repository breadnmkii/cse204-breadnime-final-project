"use strict";
/*
 *  Middleware providing abstraction for breadnime interaction with consumet API
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPopular = exports.getEpisodeStreams = exports.getAnime = exports.getSearch = void 0;
const extensions_1 = require("@consumet/extensions");
const API_PROVIDER = new extensions_1.ANIME.Gogoanime();
// Function returning JSON data on anime searched by keywords
// NOTE: may have to be async...?
function getSearch(req, res, next) {
    const searchTerms = 'one piece'; // DEBUG: how to obtain searchterms from http req? GET params?
    const result = API_PROVIDER.search(searchTerms)
        .then(data => {
        console.log(`Search data for ${searchTerms}`);
        console.log(data);
        return data;
    });
    // Pass data to view renderer...
    res.locals.data = result;
    next();
}
exports.getSearch = getSearch;
// Function for returning JSON data specific to anime ID
function getAnime(animeID) {
    const result = API_PROVIDER.fetchAnimeInfo(animeID)
        .then(data => {
        console.log(`Anime detail for ${animeID}`);
        console.log(data);
        return data;
    });
    return result;
}
exports.getAnime = getAnime;
// Function for returning M3U8 streaming URLs of specific episode ID
function getEpisodeStreams(episodeID) {
    const result = API_PROVIDER.fetchEpisodeSources(episodeID)
        .then(data => {
        console.log(`Stream sources for ${episodeID}`);
        console.log(data);
        return data;
    });
    return result;
}
exports.getEpisodeStreams = getEpisodeStreams;
// Function returning JSON data on current popular anime
function getPopular() {
    const result = API_PROVIDER.fetchTopAiring()
        .then(data => {
        console.log(`Top airing detail`);
        console.log(data);
        return data;
    });
    return result;
}
exports.getPopular = getPopular;
