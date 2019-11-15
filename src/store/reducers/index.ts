import { combineReducers } from 'redux'

import { auth } from './auth'
import { movies, movieById, moviesRecommendations, moviesList } from './movies'

const rootReducer = combineReducers({
    auth,
    movies,
    movieById,
    moviesRecommendations,
    moviesList
})

export default rootReducer
