import { LoginDto } from "./dto/LoginDto.dto"
import { POST } from "./api-req"

const API = 'auth'

export const login = async (payload: LoginDto) => {
    try {
        const response = await POST(`${API}/login`, payload)

        return response
    } catch (error) {
        throw new Error('Failed to login')
    }
}