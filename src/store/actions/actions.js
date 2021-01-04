import { actions } from '../types'

// export const setSearchTerm = (term) => {
//     return {
//         type: actions.SET_SEARCH_TERM,
//         payload: term
//     }
// }

export const setURLParams = (params) => {
    return {
        type: actions.SET_URL_PARAMS,
        payload: params
    }
}

export const resetURLParams = (payload) => {
    return {
        type: actions.RESET_URL_PARAMS,
        payload: payload
    }
}

export const pageUp = () => {
    return {
        type: actions.PAGE_UP
    }
}

export const pageDown = () => {
    return {
        type: actions.PAGE_DOWN
    }
}
