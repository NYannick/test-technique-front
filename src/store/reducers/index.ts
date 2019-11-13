import { combineReducers } from 'redux'

import { auth } from './auth'
import { movies } from './movies'

const rootReducer = combineReducers({
    auth,
    movies
})

export default rootReducer
