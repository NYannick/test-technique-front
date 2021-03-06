import {
    MOVIES_DISCOVER_SUCCESS,
    MOVIE_BY_ID_SUCCESS,
    MOVIES_RECOMMENDATIONS_SUCCESS,
    MOVIE_ADD_ITEMS_SUCCESS,
    MOVIE_LIST_SUCCESS,
    MOVIE_DELETE_ITEM_SUCCESS
} from './types'
import { requestOptions } from '../../services/user'
import axios from 'axios'
import { authHeader } from '../../helpers/authHeader'

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmM1MGJiMDg3ZGJhOWQ5MmNjNDhiNzQwNGRhOTg0YSIsInN1YiI6IjVkYzQzMjQ4OGQyMmZjMDAxNDNlMmFiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XRBKBn2cnFW_HJP7oJlsXMfWAn9-V3_rx3nT1chvPIQ'
const api_key = '8bc50bb087dba9d92cc48b7404da984a'

export const getMoviesDiscover = (sortBy: string, page: number) => {
    return async (dispatch: any) => {
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

export const addItems = (id: number, items: any) => {
    return (dispatch: any) => {
        const options = requestOptions(
            'post',
            `/4/list/${id}/items`,
            authHeader(),
            { api_key }
        )
        axios({ ...options, data: { items }})
            .then(res => {
                dispatch({
                    type: MOVIE_ADD_ITEMS_SUCCESS,
                    payload: res.data
                })
            })
    }
}

export const deleteItems = (id: number, items: any) => {
    return (dispatch: any) => {
        const options = requestOptions(
            'delete',
            `/4/list/${id}/items`,
            authHeader(),
            { api_key }
        )
        axios({ ...options, data: { items }})
            .then(res => {
                dispatch({
                    type: MOVIE_DELETE_ITEM_SUCCESS,
                    payload: res.data
                })
            })
    }
}

export const getList = (id: number, accessToken: string) => {
    return async (dispatch: any) => {
        const options = requestOptions(
            'get',
            `/4/list/${id}`,
            accessToken,
            { api_key }
        )
        axios(options)
        .then(res => {
            dispatch({
                type: MOVIE_LIST_SUCCESS,
                payload: res.data
            })
        })
    }
}
