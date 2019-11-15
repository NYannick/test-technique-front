import { combineReducers } from 'redux'

import { auth } from './auth'
import { movies, movieById, moviesRecommendations, addMovieItems, moviesList } from './movies'

const rootReducer = combineReducers({
    auth,
    movies,
    movieById,
    moviesRecommendations,
    addMovieItems,
    moviesList
})

export default rootReducer
