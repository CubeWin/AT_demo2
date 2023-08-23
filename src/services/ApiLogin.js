import { API_BASE_URL } from "../constants/dataConfig"

export const isAvailable = async () => {
    return await fetch(API_BASE_URL, {
        method: 'HEAD'
    })
}

export const login = async (user, password) => {
    // console.log(`user: ${user}, password: ${password}`)

    let res = await fetch(`${API_BASE_URL}/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: password })
    })

    let data = await res.json()
    // console.log('data:', data)
    return data
}

export const authenticate = async (token) => {
    // console.log('token: ', token)

    let res = await fetch(`${API_BASE_URL}/validtoken`, {
        method: 'POST',
        headers: { 'auth-token': token }
    })

    let data = await res.json()
    // console.log('data:', data)
    return data
}