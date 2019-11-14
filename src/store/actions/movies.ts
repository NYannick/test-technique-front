import {
    MOVIES_DISCOVER_SUCCESS,
    MOVIE_BY_ID_SUCCESS,
    MOVIES_RECOMMENDATIONS_SUCCESS
} from './types'
import { requestOptions } from '../../services/user'
import axios from 'axios'

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmM1MGJiMDg3ZGJhOWQ5MmNjNDhiNzQwNGRhOTg0YSIsInN1YiI6IjVkYzQzMjQ4OGQyMmZjMDAxNDNlMmFiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XRBKBn2cnFW_HJP7oJlsXMfWAn9-V3_rx3nT1chvPIQ'
const api_key = '8bc50bb087dba9d92cc48b7404da984a'

export const getMoviesDiscover = (sortBy: string, page: number) => {
    return (dispatch: any) => {
        const options = requestOptions(
            'get',
            '/3/discover/movie',
            accessToken,
            { api_key, sort_by: sortBy ? sortBy : 'popularity.desc', page }
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

export const getMovieDetails = (id: number) => {
    return (dispatch: any) => {
        const options = requestOptions(
            'get',
            `/3/movie/${id}`,
            accessToken,
            { api_key  }
        )
        axios({ ...options, headers: {} })
            .then(res => {
                dispatch({
                    type: MOVIE_BY_ID_SUCCESS,
                    payload: res.data
                })
            })
    }
}

export const getMoviesRecommendations = (id: number) => {
    return (dispatch: any) => {
        const options = requestOptions(
            'get',
            `/3/movie/${id}/recommendations`,
            accessToken,
            { api_key }
        )
        axios({ ...options, headers: {} })
            .then(res => {
                dispatch({
                    type: MOVIES_RECOMMENDATIONS_SUCCESS,
                    payload: res.data
                })
            })
    }
}
