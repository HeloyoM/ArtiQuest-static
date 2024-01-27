import axios from "axios"
import baseUrl from "./base-url"

interface User {
    email: string
    password: string
    phoneNumber: string
    firstName: string
    lastName: string
}
export const register = (user: User) => {
    axios.post(`${baseUrl}/user`, { user }).then(res => res.data)
}