import { expressURL, elastic } from '../express'

export const fetchResults = async (args) => {
    let term = args.term ? args.term : ''
    let offset = args.offset ? args.offset : 0
    console.log(term, offset)
    try {
        const data = await expressURL.get(elastic.searchItems, {
            params: { term, offset } //params: { term, offset },
        })
        console.log('got data', data)
        return { data: data.data }
    } catch (error) {
        console.error('there been fetchResults error ', error)
        return error
    }
}
