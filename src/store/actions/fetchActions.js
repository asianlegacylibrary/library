import { getAsyncAction } from './asyncActionUtils'
import { fetchResults, fetchDetails } from '../apis/elasticsearch'
import { fetchTypes } from '../types'

export const fetchResultsAction = getAsyncAction({
    actionType: fetchTypes.RESULTS,
    asyncFunc: fetchResults
})

export const fetchDetailsAction = getAsyncAction({
    actionType: fetchTypes.DETAILS,
    asyncFunc: fetchDetails
})
