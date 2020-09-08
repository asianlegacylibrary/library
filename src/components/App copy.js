import React from 'react'
import { useLocation } from 'react-router-dom'
import '../assets/css/App.css'
import SwipeableTemporaryDrawer from '../components/material/Drawer'

//import connect from '../connect'
// test Elastic connection
//connect()

function App({ setRef }) {
    let location = useLocation()
    return (
        <div className='App'>
            <SwipeableTemporaryDrawer ref={setRef} />
            <header className='App-header'>MEOW {location.pathname}</header>
        </div>
    )
}

export default App
