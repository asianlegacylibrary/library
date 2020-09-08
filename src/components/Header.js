import React from 'react'
import { useLocation } from 'react-router-dom'

export function Header() {
    let location = useLocation()
    return <header className='App-header'>MEOW {location.pathname}</header>
}
