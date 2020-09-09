//import AppSearchClient from '@elastic/app-search-node'
import * as ElasticAppSearch from '@elastic/app-search-javascript'

export default () => {
    const apiKey = 'search-yt2evz2yjoi3pq33qosohdub'
    // const baseUrl = () => 'http://localhost:3002/api/as/v1/'
    const endpointUrl =
        'https://4b93c526e8ff43acac3581eec1a22cfb.ent-search.us-west1.gcp.cloud.es.io'
    const engineName = 'test'

    const client = ElasticAppSearch.createClient({
        searchKey: apiKey,
        endpointBase: endpointUrl,
        engineName: engineName
    })

    console.log(client)

    var options = {
        search_fields: { title: {} },
        result_fields: { id: { raw: {} }, title: { raw: {} } }
    }

    client
        .search('DKYIL', options)
        .then((resultList) => {
            console.log('meow', resultList)
            resultList.results.forEach((result) => {
                console.log(
                    `id: ${result.getRaw('id')} raw: ${result.getRaw('title')}`
                )
            })
        })
        .catch((error) => {
            console.log(`error: ${error}`)
        })
}
