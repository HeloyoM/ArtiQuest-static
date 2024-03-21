import { GET } from "./api-req"

const API = 'post'

export const getPostsByAuthorId = async () => {
    try {
        const response = await GET(`${API}/findBy`)

        return response
    } catch (error) {
        throw new Error('Posts for given author not found or proccess failed.')
    }
}