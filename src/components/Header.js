import '../assets/css/Header.scss'
import React from 'react'
import { useDispatch } from 'react-redux'
import logo from '../assets/img/logo.png'

import { actions } from '../store/types'

export function Header() {
    //let location = useLocation()
    const dispatch = useDispatch()

    return (
        <header className='header'>
            <div className='header-container'>
                <a
                    href='/'
                    onClick={() => dispatch({ type: actions.RESET_URL_PARAMS })}
                >
                    <img
                        className='img-logo'
                        src={logo}
                        alt='logo'
                        width='50px'
                    />
                </a>
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
