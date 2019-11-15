import axios, { AxiosRequestConfig } from 'axios'

export const requestOptions = (
    method: any,
    url: string,
    accessToken: string,
    params: any
): AxiosRequestConfig => {
    return {
        method,
        url,
        withCredentials: false,
        baseURL: 'https://api.themoviedb.org/',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${accessToken}`
        },
        params
    }
}

export const createRequestToken = (accessToken: string) => {

    const options = requestOptions(
        'post',
        '/4/auth/request_token',
        accessToken,
        { redirect_to: 'http://localhost:3000/movies' }
    )

    return axios(options)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user))
            return user
        })
}

export const createAccessToken = (accessToken: string, requestToken: string) => {

    const options = requestOptions(
        'post',
        '/4/auth/access_token',
        accessToken,
        { request_token: requestToken }
    )

    return axios(options)
        .then(user => {
            localStorage.setItem('userAccessToken', JSON.stringify(user))
            return user
        })
}
