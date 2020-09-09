import { combineReducers } from 'redux'
import elasticsearch from './elasticsearch'

export default combineReducers({
    search: elasticsearch
})
