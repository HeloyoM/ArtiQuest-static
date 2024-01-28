import axios from "axios"
import baseUrl from "./base-url"
import { User } from "../interface/user.interface"

export const register = async (user: User) => {
    try {
        const response = await axios.post(`${baseUrl}/user`, user).then(res => res.data)
        return response.data
    } catch (error) {
        throw new Error('Failed to fetch categories')
    }
}

export const findAllUsers = async () => {
    try {
        const response = await axios.get(`${baseUrl}/user`).then(res => res.data)
        return response
    } catch (error) {
        throw new Error('Failed to fetch categories')
    }
}