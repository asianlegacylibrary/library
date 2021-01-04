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
                    offset: 0,
                    data: {
                        hits: action.payload.data.hits,
                        total: { value: action.payload.data.total.value },
                        error: {}
                    }
                }
            }
        case actions.ERROR_RESULTS:
            if (action.payload.status === 0) {
                console.log('no server error', action.payload)
                return {
                    ...state,
                    results: {
                        ...state.results,
                        isFetching: false,
                        offset: 0,
                        data: {
                            total: {
                                value: 0
                            },
                            error: {
                                errorStatus:
                                    'Library Server appears to be down...',
                                generalMsgToUser:
                                    'Library Server appears to be down...'
                            }
                        }
                    }
                }
            } else {
                return {
                    ...state,
                    results: {
                        ...state.results,
                        isFetching: false,
                        url: '',
                        data: {
                            total: {
                                value: 0
                            },
                            error: {
                                errorStatus: action.payload.data.errors[0].msg,
                                generalMsgToUser:
                                    'Cannot connect with our library...'
                            }
                        }
                    }
                }
            }

        default:
            return state
    }
}
