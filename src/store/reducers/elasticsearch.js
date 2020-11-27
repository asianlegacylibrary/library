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
                    total: { value: action.payload.data.total.value },
                    data: {
                        hits: action.payload.data.hits
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
