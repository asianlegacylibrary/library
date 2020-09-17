import { actions } from '../types'
import { initialState } from '../initialState'

export default (state = initialState.elasticsearch, action) => {
    switch (action.type) {
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
                    url: action.payload.config.url,
                    data: {
                        hits: action.payload.data.results.hits
                    }
                }
            }
        case actions.ERROR_RESULTS:
            return {
                ...state,
                results: {
                    ...state.results,
                    isFetching: false,
                    url: action.payload.config.url,
                    error: {
                        errorStatus: action.payload.status,
                        generalMsgToUser: 'Cannot connect with our library...'
                    }
                }
            }
        default:
            return state
    }
}
