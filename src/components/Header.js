import '../assets/css/Header.css'
import React from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../assets/img/logo.png'

export function Header() {
    let location = useLocation()
    return (
        <header className='header'>
            <div className='header-container'>
                <img className='img-logo' src={logo} alt='logo' width='40px' />
                <p>
                    Asian Legacy Library{' '}
                    <span className='show-params'>{location.pathname}</span>
                </p>
            </div>
        </header>
    )
}
