import { MOVIES_DISCOVER_SUCCESS } from './types'
import { requestOptions } from '../../services/user'
import axios from 'axios'

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmM1MGJiMDg3ZGJhOWQ5MmNjNDhiNzQwNGRhOTg0YSIsInN1YiI6IjVkYzQzMjQ4OGQyMmZjMDAxNDNlMmFiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XRBKBn2cnFW_HJP7oJlsXMfWAn9-V3_rx3nT1chvPIQ'

export const getMovieDiscover = () => {
    return (dispatch: any) => {
        const options = requestOptions(
            'get',
            '/3/discover/movie',
            accessToken,
            { api_key: '8bc50bb087dba9d92cc48b7404da984a' }
        )
        axios({ ...options, headers: {} })
            .then(res => {
                dispatch({
                    type: MOVIES_DISCOVER_SUCCESS,
                    payload: res.data
                })
            })
    }
}
