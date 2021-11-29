import CardContent from '@material-ui/core/CardContent'
import '../../assets/css/Search-Results.scss'
import React from 'react'
import { useSelector } from 'react-redux'
import { ResultCard } from './index'

export function Results() {
    const results = useSelector((state) => state.elasticsearch.results)
    let r = []

    if (results.isFetching) {
        return <div className='search-results'>SEARCHING...</div>
    }

    if (Object.keys(results.data.error).length > 0) {
        return (
            <div key='results' className='search-results'>
                <CardContent>{results.data.error.errorStatus}</CardContent>
            </div>
        )
    }

    // add check to see if results need to be reloaded (search re-initialized)

    r = results.data.hits.map((r, i) => {
        return <ResultCard key={i} data={r} />
    })

    return <div className='search-results'>{r}</div>
}
