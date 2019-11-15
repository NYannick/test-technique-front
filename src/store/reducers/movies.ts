import {
    MOVIES_DISCOVER_REQUEST,
    MOVIES_DISCOVER_FAILURE,
    MOVIES_DISCOVER_SUCCESS,
    MOVIE_BY_ID_SUCCESS,
    MOVIES_RECOMMENDATIONS_SUCCESS,
    MOVIE_ADD_ITEMS_SUCCESS,
    MOVIE_DELETE_ITEM_SUCCESS,
    MOVIE_LIST_SUCCESS
} from '../actions/types'

export const movies = (state = {}, action: any) => {
    switch (action.type) {
        case MOVIES_DISCOVER_REQUEST:
            return {
                loading: true
            }
        case MOVIES_DISCOVER_SUCCESS:
            return {
                ...action.payload
            }
        case MOVIES_DISCOVER_FAILURE:
            return {
                error: action.payload
            }
        default:
            return state
    }
}

export const movieById = (state = {}, action: any) => {
    switch (action.type) {
        case MOVIE_BY_ID_SUCCESS:
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export const moviesRecommendations = (state = {}, action: any) => {
    switch (action.type) {
        case MOVIES_RECOMMENDATIONS_SUCCESS:
            return {
                ...action.payload
            }
        default:
            return state
    }
}

const initialState = {
    status_message: '',
    results: [],
    success: false,
    status_code: 0
}

export const addMovieItems = (state = initialState, action: any) => {
    switch (action.type) {
        case MOVIE_ADD_ITEMS_SUCCESS:
            return {
                ...action.payload,
                results: [...state.results, ...action.payload.results]
            }
        default:
            return state
    }
}

export const moviesList = (state = {}, action: any) => {
    switch (action.type) {
        case MOVIE_LIST_SUCCESS:
            return {
                ...action.payload
            }
        case MOVIE_DELETE_ITEM_SUCCESS:
            return {
                ...action.payload
            }
        default:
            return state
    }
}
