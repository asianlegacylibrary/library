import '../assets/css/Header.css'
import React from 'react'
import { useLocation } from 'react-router-dom'

export function Header() {
    let location = useLocation()
    return (
        <header className='header'>
            <div className='header-container'>
                <h1>ACIP {location.pathname}</h1>
            </div>
        </header>
    )
}
