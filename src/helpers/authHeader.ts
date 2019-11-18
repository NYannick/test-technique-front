export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('userAccessToken') || '')!
    if (user && user.data.access_token) return user.data.access_token
    else return {}
}
