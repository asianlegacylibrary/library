import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

export function BackButton({ isMount, children }) {
    let history = useHistory()

    return (
        <Button type='button' onClick={() => history.goBack()}>
            {children}
        </Button>
    )
}
