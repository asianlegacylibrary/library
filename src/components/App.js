import React, { Component } from 'react'
import '../assets/css/App.css'
import { Header, SearchBar } from './index'

import {
    SwipeableTemporaryDrawer,
    SimpleBreadcrumbs
} from '../components/material'

export class App extends Component {
    constructor(props) {
        super(props)
        this.childRef = React.createRef()
    }

    componentDidMount() {
        //this.childRef.current.focus()
    }

    render() {
        return (
            <div className='App'>
                <SwipeableTemporaryDrawer ref={this.childRef} />
                <SimpleBreadcrumbs />
                <Header />
                <SearchBar />
            </div>
        )
    }
}
