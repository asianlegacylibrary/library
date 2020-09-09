import { combineReducers } from 'redux'
import testReducer from './testReducer'
import elasticsearch from './elasticsearch'

export default combineReducers({
    test: testReducer,
    search: elasticsearch
})
