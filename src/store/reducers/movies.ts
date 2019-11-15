import {
    MOVIES_DISCOVER_REQUEST,
    MOVIES_DISCOVER_FAILURE,
    MOVIES_DISCOVER_SUCCESS,
    MOVIE_BY_ID_SUCCESS,
    MOVIES_RECOMMENDATIONS_SUCCESS,
    MOVIE_ADD_ITEMS_SUCCESS
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

export const moviesList = (state = initialState, action: any) => {
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
