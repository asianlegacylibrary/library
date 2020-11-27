import '../../assets/css/Search-Results.css'
import React from 'react'
import { useSelector } from 'react-redux'
import { ResultCard } from './index'

export function Results() {
    const results = useSelector((state) => state.elasticsearch.results)
    const r = results.data.hits.map((r, i) => {
        return <ResultCard key={i} data={r} />
    })

    return <div className='search-results'>{r}</div>
}
