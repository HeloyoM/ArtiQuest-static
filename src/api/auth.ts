import axios from "axios"
import baseUrl from "./base-url"
import { LoginDto } from "./dto/LoginDto.dto"

const API = 'auth'

export const login = async (payload: LoginDto) => {
    try {
        const response = await axios.post(`${baseUrl}/${API}/login`, payload).then(res => res.data)
        return response.data
    } catch (error) {
        throw new Error('Failed to login')
    }
}