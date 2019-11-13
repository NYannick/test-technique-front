import {
    MOVIES_DISCOVER_REQUEST,
    MOVIES_DISCOVER_FAILURE,
    MOVIES_DISCOVER_SUCCESS
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
