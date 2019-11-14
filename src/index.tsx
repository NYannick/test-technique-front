import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListMovies from './containers/ListMovies/ListMovies'
import MovieById from './containers/MovieById/MovieById'

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route path='/' component={App} exact />
                    <Route path='/movies' component={ListMovies} exact />
                    <Route path='/movies/:id' component={MovieById} exact />
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
