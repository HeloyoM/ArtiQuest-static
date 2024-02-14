import axios from "axios"
import baseUrl from "./base-url"

const API = 'about'

export const getAboutCV = async () => {
    try {
        const response = await axios.get(`${baseUrl}/${API}`)
        return response.data
    } catch (error) {
        throw new Error(`Failed to fetch cv`)
    }
}