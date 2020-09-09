import { expressURL, elastic } from '../express'

export const fetchResults = async (args) => {
    let term = args.term ? args.term : ''
    let offset = args.offset ? args.offset : 0
    try {
        const data = await expressURL.get(elastic.searchItems, {
            params: { term, offset }
        })
        return { data: data.data }
    } catch (error) {
        console.error('there been fetchResults error ', error)
        return error
    }
}
