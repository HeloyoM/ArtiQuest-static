import { User } from "../interface/user.interface"
import { GET, POST, PUT } from "./api-req"
import { ContactMsgDto } from "./dto/ContactMsg.dto"
import { UpdateUserDto } from "./dto/UpdateUser.dto"

const API = 'user'

export const register = async (user: User) => {
    try {
        const response = await POST(API, user)

        return response
    } catch (error) {
        throw new Error('Failed to fetch categories')
    }
}

export const updateUser = async (user: UpdateUserDto) => {
    try {
        const response = await PUT(API, user)

        return response
    } catch (error) {
        throw new Error('Failed to update user')
    }
}

export const findAllUsers = async () => {
    try {
        const response = await GET(API)

        return response
    } catch (error) {
        throw new Error('Failed to fetch categories')
    }
}

export const sendContactMsg = async (payload: ContactMsgDto) => {
    try {
        const response = await POST(`${API}/contact`, payload)

        return response
    } catch (error) {
        throw new Error('Failed to send contact message')
    }
}