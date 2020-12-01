import '../../assets/css/Search.scss'
import React from 'react'
import { useSelector } from 'react-redux'

export const SearchOverview = () => {
    const total = useSelector(
        (state) => state.elasticsearch.results.data.total.value
    )
    const params = useSelector((state) => state.URLParams)

    const paramDisplay = Object.entries(params).map(([k, v]) => {
        return <span key={k}>{`${k} => ${v}`}</span>
    })

    return (
        <div className='search-controls'>
            <div className='results-total'>
                <p>{`Results: ${total}`}</p>
            </div>
            <div className='url-params'>
                <p>{paramDisplay}</p>
            </div>
        </div>
    )
}
