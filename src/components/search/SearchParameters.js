import { Input } from '@material-ui/core'
import '../../assets/css/mui/Input.scss'
import '../../assets/css/Search.scss'
import React from 'react'
import { ParamInput } from './ParamInput'
import { useSelector } from 'react-redux'

export const SearchParameters = ({ handleChange, handleNewSearch }) => {
    const total = useSelector(
        (state) => state.elasticsearch.results.data.total.value
    )
    const params = useSelector((state) => state.URLParams)
    console.log(params)
    const paramDisplay = Object.entries(params).map(([k, v]) => {
        if (k !== 'q') {
            return (
                <span key={k}>
                    {`${k} =>`}
                    <input
                        name={k}
                        className='param-filter'
                        spellCheck='false'
                        autoCapitalize='false'
                        autoCorrect='false'
                        autoComplete='false'
                        autoFocus
                        type='text'
                        value={v}
                        onChange={(e) => handleChange(e)}
                        onKeyDown={(e) =>
                            e.key === 'Enter' ? handleNewSearch(e) : null
                        }
                    />
                </span>
            )
        }
        // if (k === 'q') return null

        // return <span key={k}>{`${k} => ${v}`}</span>
    })

    return (
        <div className='search-controls'>
            <div className='url-params'>
                <p>{paramDisplay}</p>
            </div>

            <div className='results-total'>
                <p>{`Results: ${total}`}</p>
            </div>
        </div>
    )
}
