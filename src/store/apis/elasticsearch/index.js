import { expressURL, elastic } from '../express'

export const fetchResults = async (args) => {
    let term = args.term ? args.term : ''
    let offset = args.offset ? args.offset : 0
    let response

    try {
        response = await expressURL.get(elastic.searchItems, {
            params: { term, offset }
        })
        return response
    } catch (error) {
        console.log('An error occured fetching data from Elasticsearch', error)

        if (error.response) {
            return error.response
        } else if (error.request) {
            return error.request
        } else {
            return error.message
        }
    }
}
