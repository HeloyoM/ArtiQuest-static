import { User } from "../interface/user.interface"
import { GET, POST } from "./api-req"

const API = 'user'

export const register = async (user: User) => {
    try {
        const response = await POST(API, user)

        return response
    } catch (error) {
        throw new Error('Failed to fetch categories')
    }
}

export const findAllUsers = async () => {
    try {
        const response= await GET(API)

        return response
    } catch (error) {
        throw new Error('Failed to fetch categories')
    }
}