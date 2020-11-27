import { actions } from '../types'
import { initialState } from '../initialState'

export default (state = initialState.URLParams, action) => {
    switch (action.type) {
        case actions.SET_URL_PARAMS:
            let p = action.payload
            for (let key in p) {
                if (!(key in state)) delete p[key]
            }

            Object.keys(state).forEach(
                (key) => state[key] == null && delete state[key]
            )

            console.log('setting parameters', state, p)

            return {
                ...state,
                ...p
            }
        default:
            return state
    }
}
