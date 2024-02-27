import { GET } from "./api-req"

const API = 'about'

export const getAboutCV = async () => {
    try {
        const response = await GET(API)

        return response
    } catch (error) {
        throw new Error(`Failed to fetch cv`)
    }
}