import axios from 'axios'
import baseUrl from './base-url'

const API = 'art'

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${baseUrl}/${API}/cat`)
        return response.data
    } catch (error) {
        throw new Error('Failed to fetch categories')
    }
}

export const getArticlesByCategoryId = async (id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/${API}/findBy/${id}`)
        return response.data
    } catch (error) {
        throw new Error('Failed to fetch articles')
    }
}

export const getArticleById = async (id: string) => {
    try {
        const response = await axios.get(`${baseUrl}/${API}/findOne/${id}`)
        return response.data
    } catch (error) {
        throw new Error(`Failed to fetch article with given id ${id}`)
    }
}