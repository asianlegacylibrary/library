import { combineReducers } from 'redux'
import elasticsearch from './elasticsearch'
import searchTerm from './setSearchTerm'

export default combineReducers({
    elasticsearch,
    searchTerm
})
