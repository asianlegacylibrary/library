import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './assets/css/index.css'
import { AppRouter } from './components/Router'
import * as serviceWorker from './serviceWorker'
import CssBaseline from '@material-ui/core/CssBaseline'

import configureStore from './store'
export const store = configureStore()

const Root = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <CssBaseline>
                    <AppRouter />
                </CssBaseline>
            </Provider>
        </React.StrictMode>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
