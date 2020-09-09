import { actions } from '../types'
import { initialState } from '../initialState'

export default (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        /* REQUESTS */
        case actions.REQUEST_RESULTS:
            return {
                ...state,
                results: {
                    ...state.search,
                    isFetching: true,
                    currentSearch: false
                }
            }
        case actions.RECEIVE_RESULTS:
            console.log(action.payload)
            return {
                ...state,
                results: {
                    ...state.search,
                    isFetching: false,
                    currentSearch: true,
                    error: false,
                    errorStatus: null,
                    items: {
                        hits: action.payload.results
                    },
                    lastUpdated: Date.now()
                }
            }
        case actions.ERROR_RESULTS:
            return {
                ...state,
                error: true,
                errorStatus: action.payload
            }
        default:
            return state
    }
}
