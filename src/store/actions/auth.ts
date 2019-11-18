import { createRequestToken, createAccessToken } from '../../services/user'
import { CREATE_REQUEST_TOKEN, CREATE_ACCESS_TOKEN } from './types'

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmM1MGJiMDg3ZGJhOWQ5MmNjNDhiNzQwNGRhOTg0YSIsInN1YiI6IjVkYzQzMjQ4OGQyMmZjMDAxNDNlMmFiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XRBKBn2cnFW_HJP7oJlsXMfWAn9-V3_rx3nT1chvPIQ'

export const authRequestToken = () => {
    return (dispatch: any) => {
        createRequestToken(accessToken)
            .then(user => {
                dispatch({
                    type: CREATE_REQUEST_TOKEN,
                    payload: user
                })
            })
    }
}

export const authAccessToken = (requestToken: string) => {
    return async (dispatch: any) => {
        createAccessToken(accessToken, requestToken)
            .then(user => {
                dispatch({
                    type: CREATE_ACCESS_TOKEN,
                    payload: user
                })
            })
    }
}
