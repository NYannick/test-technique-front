export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user') || '')
    if (user && user.data.request_token) return { 'Authorization': 'Bearer ' + user.token }
    else return {}
}
