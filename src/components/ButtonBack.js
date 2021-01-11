import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

export function BackButton({ children }) {
    let history = useHistory()
    function handleClick(history) {
        if ('from' in history.location.state) {
            history.push('/search')
        } else {
            history.goBack()
        }
    }

    return (
        //</Button><Button type='button' onClick={() => handleClick(history)}>
        <Button type='button' onClick={() => history.goBack()}>
            {children}
        </Button>
    )
}
