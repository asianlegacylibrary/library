import { actions } from '../types'
import { initialState } from '../initialState'

export default (state = initialState, action) => {
    switch (action.type) {
        /* REQUESTS */
        case actions.REQUEST_RESULTS:
            return {
                ...state,
                results: {
                    ...state.results,
                    isFetching: true
                }
            }
        case actions.RECEIVE_RESULTS:
            return {
                ...state,
                results: {
                    ...state.results,
                    isFetching: false,
                    data: {
                        hits: action.payload.data.results.hits
                    }
                }
            }
        case actions.ERROR_RESULTS:
            return {
                ...state,
                error: true,
                results: {
                    ...state.results,
                    isFetching: false,
                    error: {
                        url: action.payload.config.url,
                        errorStatus: action.payload.status,
                        msg: 'Cannot connect with our library...'
                    }
                }
            }
        default:
            return state
    }
}
