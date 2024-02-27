import axios from 'axios'
import baseUrl from './base-url'

export async function POST(endpoint: string, body: any) {
    const config = getRequestConfiguration()
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
    const tokenAccess = localStorage.getItem('token')
    const token = tokenAccess ? tokenAccess : null
    const { token: cancelToken } = axios.CancelToken.source()
    const headers = token ? { Authorization: `Bearer ${tokenAccess}` } : { Authorization: null }

    return {
        headers,
        cancelToken
    }
}