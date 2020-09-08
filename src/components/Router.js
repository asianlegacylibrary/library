import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import routes from '../store/routes'
import { Breadcrumbs } from '../components'

export function AppRouter() {
    return (
        <Router>
            <Switch>
                {routes.map(({ path, Component }, key) => (
                    <Route
                        exact
                        path={path}
                        key={key}
                        render={({ match, history }) => {
                            const crumbs = routes
                                // Get all routes that contain the current one.
                                .filter(({ path }) => match.path.includes(path))
                                // Swap out any dynamic routes with their param values.
                                // E.g. "/pizza/:pizzaId" will become "/pizza/1"
                                .map(({ path, ...rest }) => ({
                                    path: Object.keys(match.params).length
                                        ? Object.keys(match.params).reduce(
                                              (path, param) =>
                                                  path.replace(
                                                      `:${param}`,
                                                      match.params[param]
                                                  ),
                                              path
                                          )
                                        : path,
                                    ...rest
                                }))

                            console.log(`Generated crumbs for ${match.path}`)
                            crumbs.map(({ name, path }) =>
                                console.log({ name, path })
                            )
                            return (
                                <React.Fragment>
                                    <Breadcrumbs crumbs={crumbs} />
                                    <Component
                                        match={match}
                                        history={history}
                                    />
                                </React.Fragment>
                            )
                        }}
                    />
                ))}
            </Switch>
        </Router>
    )
}
