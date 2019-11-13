import { CREATE_REQUEST_TOKEN, CREATE_ACCESS_TOKEN } from '../actions/types'

// const user = JSON.parse(localStorage.getItem('user') || '')
const initialState = {}

export const auth = (state = initialState, action: any) => {
    switch (action.type) {
        case CREATE_REQUEST_TOKEN:
        case CREATE_ACCESS_TOKEN:
            return {
                ...action.payload,
                loggedIn: true
            }
        default:
            return state
    }
}
