export const fetchTypes = {
    RESULTS: 'RESULTS',
    DETAILS: 'DETAILS'
}

export const status = {
    START: 'START',
    CLEAR: 'CLEAR',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    REQUEST: 'REQUEST',
    RECEIVE: 'RECEIVE',
    ERROR: 'ERROR'
}

export const actions = {
    REQUEST_RESULTS: 'REQUEST_RESULTS',
    RECEIVE_RESULTS: 'RECEIVE_RESULTS',
    ERROR_RESULTS: 'ERROR_RESULTS',
    REQUEST_DETAILS: 'REQUEST_DETAILS',
    RECEIVE_DETAILS: 'RECEIVE_DETAILS',
    SET_SEARCH_TERM: 'SET_SEARCH_TERM',
    SET_URL_PARAMS: 'SET_URL_PARAMS',
    RESET_URL_PARAMS: 'RESET_URL_PARAMS',
    PAGE_UP: 'PAGE_UP',
    PAGE_DOWN: 'PAGE_DOWN'
}

export const constants = {
    searchUrlBase: 'search',
    elasticDefaultResultSize: 10
}
