import { actions } from '../types'
import { initialState } from '../initialState'

export default (state = initialState.URLParams, action) => {
    switch (action.type) {
        case actions.SET_URL_PARAMS:
            let p = action.payload

            // here we're just cleaning up before sending to API
            // getting rid of misspelled params
            for (let key in p) {
                if (!(key in state)) delete p[key]
            }

            Object.keys(state).forEach(
                (key) => state[key] == null && delete state[key]
            )

            return {
                ...state,
                ...p
            }
        case actions.RESET_URL_PARAMS:
            return {
                ...initialState.URLParams,
                ...action.payload
            }
        default:
            return state
    }
}
