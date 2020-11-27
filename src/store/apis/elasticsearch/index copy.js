import { expressURL, elastic } from '../express'

export const fetchResults = async (params) => {
    // console.log('these are the args:', args)
    // let term = args.term ? args.term : ''
    // let q = args.q ? args.q : ''
    // let offset = args.offset ? args.offset : 0

    let response

    try {
        // response = await expressURL.get(elastic.resources, {
        //     params: { q, offset }
        // })
        response = await expressURL.get(elastic.resources, {
            params: params
        })
        //console.log(response)
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
