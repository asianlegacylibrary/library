import { Input } from '@material-ui/core'
import '../../assets/css/mui/Input.css'
import '../../assets/css/Search-Bar.css'
import React from 'react'

export const SearchBar = ({ value, handleChange, handleNewSearch }) => {
    return (
        <div className='search-bar'>
            <Input
                className='MuiInput-root'
                spellCheck='false'
                autoCapitalize='false'
                autoCorrect='false'
                autoComplete='false'
                autoFocus
                type='text'
                value={value}
                onChange={(e) => handleChange(e)}
                onKeyDown={(e) =>
                    e.key === 'Enter' ? handleNewSearch(e) : null
                }
            />
        </div>
    )
}
