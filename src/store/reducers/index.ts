import { combineReducers } from 'redux'

import { auth } from './auth'
import { movies, movieById, moviesRecommendations } from './movies'

const rootReducer = combineReducers({
    auth,
    movies,
    movieById,
    moviesRecommendations
})

export default rootReducer
