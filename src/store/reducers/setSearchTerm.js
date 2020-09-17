import { actions } from '../types'
import { initialState } from '../initialState'

export default (state = initialState.searchTerm, action) => {
    switch (action.type) {
        case actions.SET_SEARCH_TERM:
            return action.payload
        default:
            return state
    }
}
