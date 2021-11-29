import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Header, SearchForm, Results, Details } from './index'
import { StylesProvider } from '@material-ui/core/styles'

/*
ROUTER COMPONENT
- controls routing in the app
- components are found here
- see the Express API for data sent to endpoints
SEARCH /search
- main page displays the Search Bar, filters, etc and search results
DETAILS /details
- each returned result can be further inspected, returns all data for specified ID
*/
export function AppRouter() {
    return (
        <Router>
            <StylesProvider injectFirst>
                <div className='container'>
                    <Header />

                    <Switch>
                        <Route
                            exact
                            path={['/search:term?', '/search', '/']}
                            render={() => {
                                return (
                                    <React.Fragment>
                                        <SearchForm />
                                        <Results />
                                    </React.Fragment>
                                )
                            }}
                        />

                        <Route
                            path='/details/:id?'
                            render={(props) => {
                                return <Details {...props} />
                            }}
                        />
                    </Switch>
                </div>
            </StylesProvider>
        </Router>
    )
}
