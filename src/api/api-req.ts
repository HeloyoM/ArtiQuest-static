import axios from 'axios'
import baseUrl from './base-url'
import { getToken } from './getDecodedUser'

export async function POST(endpoint: string, body: any) {
    const config = getRequestConfiguration()

    if (body instanceof FormData)
        config.headers['Content-type'] = "multipart/form-data"

    return await (
        await axios.post(`${baseUrl}/${endpoint}`, body, config)
    ).data
}

export async function PUT(endpoint: string, body: any) {
    const config = getRequestConfiguration()
    return await (
        await axios.put(`${baseUrl}/${endpoint}`, body, config)
    ).data
}

export async function GET(endpoint: string) {
    const config = getRequestConfiguration()
    return await (
        await axios.get(`${baseUrl}/${endpoint}`, config)
    ).data
}

export async function PATCH(endpoint: string, body: any) {
    const config = getRequestConfiguration()
    return await (
        await axios.patch(`${baseUrl}/${endpoint}`, body, config)
    ).data
}

export async function DELETE(endpoint: string) {
    const config = getRequestConfiguration()

    return await (
        await axios.delete(`${baseUrl}/${endpoint}`, config)
    ).data
}

const getRequestConfiguration = () => {
    const tokenAccess = getToken()

    const token = tokenAccess ? tokenAccess : null
    const headers = token ? { Authorization: `Bearer ${tokenAccess}`, 'Content-type': "application/json" } : { Authorization: null, 'Content-type': "application/json" }

    return {
        headers
    }
}