import './assets/css/variables.css'
import './assets/css/index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { AppRouter } from './components/AppRouter'
import * as serviceWorker from './serviceWorker'

import configureStore from './store'
export const store = configureStore()

const Root = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <AppRouter />
            </Provider>
        </React.StrictMode>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
