import { getAsyncAction } from './asyncActionUtils'
import { fetchResults } from '../apis/elasticsearch'
import { fetchTypes } from '../types'

export const fetchResultsAction = getAsyncAction({
    actionType: fetchTypes.RESULTS,
    asyncFunc: fetchResults
})
