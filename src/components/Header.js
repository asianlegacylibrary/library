import '../assets/css/Header.scss'
import React from 'react'
//import { useLocation } from 'react-router-dom'
import logo from '../assets/img/logo.png'

export function Header() {
    //let location = useLocation()
    return (
        <header className='header'>
            <div className='header-container'>
                <img className='img-logo' src={logo} alt='logo' width='50px' />
                <p className='header-title'>
                    API{' '}
                    {/* <span className='show-params'>
                        {unescape(location.pathname)}
                    </span> */}
                </p>
            </div>
        </header>
    )
}
