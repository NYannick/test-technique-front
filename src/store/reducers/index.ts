import { combineReducers } from 'redux'

import { auth } from './auth'
import { movies, movieById } from './movies'

const rootReducer = combineReducers({
    auth,
    movies,
    movieById
})

export default rootReducer
