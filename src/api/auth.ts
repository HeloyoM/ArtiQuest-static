import { LoginDto } from "./dto/LoginDto.dto"
import { PATCH, POST } from "./api-req"

const API = 'auth'

export const login = async (payload: LoginDto) => {
    try {
        const response = await POST(`${API}/login`, payload)

        return response
    } catch (error) {
        throw new Error('Failed to login')
    }
}

export const logout = async () => {
    try {
        const response = await PATCH(`${API}/logout`, {})

        return response
    } catch (error) {
        throw new Error('Failed to login')
    }
}

export const refreshToken = async () => {
    try {
        const response = await POST(`${API}/refresh-token`, {})

        return response
    } catch (error) {
        throw new Error('falied to refresh login, please log in again.')
    }
}

