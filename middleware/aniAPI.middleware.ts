/*
 *  Middleware providing abstraction for breadnime interaction with consumet API
 */

import { ANIME } from '@consumet/extensions'

const API_PROVIDER = new ANIME.Gogoanime();

// Function returning JSON data on anime searched by keywords
// NOTE: may have to be async...?
export function getSearch(searchTerms: string) {
    const result = API_PROVIDER.search(searchTerms)
    .then(data => {
        console.log(`Search data for ${searchTerms}`);
        console.log(data);
        return data;
    });

    return result;
}

// Function for returning JSON data specific to anime ID
export function getAnime(animeID: string) {
    const result = API_PROVIDER.fetchAnimeInfo(animeID)
    .then(data => {
        console.log(`Anime detail for ${animeID}`);
        console.log(data);
        return data;
    });

    return result;
}

// Function for returning M3U8 streaming URLs of specific episode ID
export function getEpisodeStreams(episodeID: string) {
    const result = API_PROVIDER.fetchEpisodeSources(episodeID)
    .then(data => {
        console.log(`Stream sources for ${episodeID}`);
        console.log(data);
        return data;
    });

    return result;
}

// Function returning JSON data on current popular anime
export function getPopular() {
    const result = API_PROVIDER.fetchTopAiring()
    .then(data => {
        console.log(`Top airing detail`);
        console.log(data);
        return data;
    });

    return result;
}