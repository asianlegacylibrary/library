import React from 'react'

export const ParamInput = ({ value, name, handleChange, handleNewSearch }) => {
    console.log(value)
    return (
        <input
            name={name}
            className='param-filter'
            spellCheck='false'
            autoCapitalize='false'
            autoCorrect='false'
            autoComplete='false'
            autoFocus
            type='text'
            value={value}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => (e.key === 'Enter' ? handleNewSearch(e) : null)}
        />
    )
}
