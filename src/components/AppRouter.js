import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header, SearchForm, Results, Details } from './index'
import { StylesProvider } from '@material-ui/core/styles'
//import logo from '../assets/img/logo.png'

export function AppRouter() {
    return (
        <Router>
            <StylesProvider injectFirst>
                <div className='container'>
                    {/* <img
                        className='background-logo'
                        src={logo}
                        alt='main background logo'
                    /> */}
                    <Header />
                    <SearchForm />
                    <Switch>
                        {/* <Route path={['/', '/results']} children={<SearchBar />} /> */}
                        <Route path='/search:term?' component={Results} />
                        <Route path='/details/:id?' component={Details} />
                    </Switch>
                </div>
            </StylesProvider>
        </Router>
    )
}
