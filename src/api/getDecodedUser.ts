import { jwtDecode } from "jwt-decode"

export const getToken = () => {
    const token = localStorage.getItem('token')

    return token
}

export default function getDecodedUser() {
    const token = getToken()

    if (token) 
        return jwtDecode(token)
    
    else return null
}