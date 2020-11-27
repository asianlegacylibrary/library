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
