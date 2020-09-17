import axios from 'axios'

const expressOptions = {
    baseUrl_Alt: 'http://api.asianclassics.org',
    baseUrl: '/api',
    devUrl: 'http://localhost:5000'
}

const setUrl =
    window.location.port === '3000'
        ? expressOptions.devUrl
        : expressOptions.baseUrl_Alt

export const expressURL = axios.create({
    baseURL: setUrl
})

// Express Routes for the Digital Library
export const elastic = {
    collections: '/collections',
    search: '/search',
    searchItems: '/search/items'
}
