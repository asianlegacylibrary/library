import { actions } from '../types'

export const setSearchTerm = (term) => {
    return {
        type: actions.SET_SEARCH_TERM,
        payload: term
    }
}
