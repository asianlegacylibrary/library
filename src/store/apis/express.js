import axios from 'axios'

let setUrl
const expressOptions = {
    baseUrl: 'https://api.asianclassics.org',
    baseUrl_alt: '/api',
    devUrl: 'http://localhost:5000',
    forceProduction: true
}

if (expressOptions.forceProduction) {
    setUrl = expressOptions.baseUrl
} else {
    setUrl =
        window.location.port === '3000'
            ? expressOptions.devUrl
            : expressOptions.baseUrl
}

export const expressURL = axios.create({
    baseURL: setUrl
})

// Express Routes for the Digital Library
export const elastic = {
    collections: '/collections',
    search: '/search',
    searchItems: '/search/items',
    resources: '/resources'
}
