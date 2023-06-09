const axios = require('axios').default;

import { ENDPOINTS, GeniusAPI_BASE_URL, GeniusAPI_KEY } from '../constants';

const GeniusAPI_HTTP_REQUEST = axios.create({
    baseURL: GeniusAPI_BASE_URL,
    params: {
        access_token: GeniusAPI_KEY,
    },
});

const getSearch = (search_term) => GeniusAPI_HTTP_REQUEST.get(ENDPOINTS.SEARCH, { params: { q: search_term } });

const getSongById = (id) => GeniusAPI_HTTP_REQUEST.get(`${ENDPOINTS.SONGS}/${id}`);

const getArtistById = (id) => GeniusAPI_HTTP_REQUEST.get(`${ENDPOINTS.ARTISTS}/${id}`);

const getArtistSongs = (id) => GeniusAPI_HTTP_REQUEST.get(`${ENDPOINTS.ARTISTS}/${id}` + ENDPOINTS.SONGS);

const getSongLyrics = (url) => axios.get(url);

export { getSearch, getSongById, getArtistById, getArtistSongs, getSongLyrics };