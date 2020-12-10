import { Input } from '@material-ui/core'
import '../../assets/css/mui/Input.scss'
import '../../assets/css/Search-Bar.scss'
import React, { useState } from 'react'

export const SearchBar = ({ value, handleChange, handleNewSearch }) => {
    const [useValue] = useState(value)

    return (
        <div className='search-bar'>
            <Input
                name='q'
                className='MuiInput-root'
                spellCheck='false'
                autoCapitalize='false'
                autoCorrect='false'
                autoComplete='false'
                autoFocus
                type='text'
                value={useValue}
                onChange={(e) => handleChange(e)}
                onKeyDown={(e) =>
                    e.key === 'Enter' ? handleNewSearch(e) : null
                }
            />
        </div>
    )
}
