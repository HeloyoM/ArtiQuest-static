import axios from 'axios'
import baseUrl from './base-url'
import { EditArticleDto } from './dto/EditArticleDto.dto'
import { Article } from '../interface/article.interface'

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

export const editArticleById = async (id: string, payload: EditArticleDto) => {
    try {
        const response = await axios.patch(`${baseUrl}/${API}/${id}`, payload)
        return response.data
    } catch (error) {
        throw new Error(`Failed to fetch article with given id ${id}`)
    }
}

export const createArticle = async (art: Article) => {
    try {
        const response = await axios.post(`${baseUrl}/${API}`, art)
        return response.data
    } catch (error) {
        throw new Error(`Failed to create new article in category id ${art.cat}`)
    }
}