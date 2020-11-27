import { combineReducers } from 'redux'
import elasticsearch from './elasticsearch'
import URLParams from './setURLParams'

export default combineReducers({
    elasticsearch,
    URLParams
})
