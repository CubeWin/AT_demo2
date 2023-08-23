import { AUTH_URL, lOGIN_URL } from "../../environment"

export const isAvailable = async () => {
    return await fetch(lOGIN_URL, {
        method: 'HEAD'
    })
}

export const login = async (user, password) => {
    // console.log(`user: ${user}, password: ${password}`)

    let res = await fetch(lOGIN_URL, {
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

    let res = await fetch(AUTH_URL, {
        method: 'POST',
        headers: { 'auth-token': token }
    })

    let data = await res.json()
    // console.log('data:', data)
    return data
}