import * as types from '../types'
import expressURL from '../apis/express'

export const fetchResults = (term, offset) => async (dispatch) => {
    let searchURL = '/search'
    let def = term

    dispatch({ type: types.REQUEST_SEARCH_RESULTS })

    try {
        const response = await expressURL.get(searchURL, {
            params: { def, offset }
        })
        dispatch({
            type: types.RECEIVE_SEARCH_RESULTS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: types.ERROR_SEARCH_RESULTS,
            payload: error
        })
    }
}
