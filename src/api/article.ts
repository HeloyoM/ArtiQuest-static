import { EditArticleDto } from './dto/EditArticle.dto'
import { Article } from '../interface/article.interface'
import { DELETE, GET, PATCH, POST, PUT } from './api-req'
import { CreateCatDto } from './dto/CreateCat.dto'

const API = 'art'

export const getAllCategories = async () => {
    try {
        const response = await GET(`${API}/cat`)

        return response
    } catch (error) {
        throw new Error('Failed to fetch categories')
    }
}

export const getArticlesByCategoryId = async (id: string) => {
    try {
        const response = await GET(`${API}/findBy/${id}`)
        console.log({ response })
        return response
    } catch (error) {
        throw new Error('Failed to fetch articles')
    }
}

export const getArticleById = async (id: string) => {
    try {
        const response = await GET(`${API}/findOne/${id}`)

        return response
    } catch (error) {
        throw new Error(`Failed to fetch article with given id ${id}`)
    }
}

export const getCategoriesList = async () => {
    try {
        const response = await GET(`${API}/cat`)

        return response
    } catch (error) {
        throw new Error(`Failed to fetch categories information, it's not should interrupt you watch categories`)
    }
}

export const editArticleById = async (id: string, payload: EditArticleDto) => {
    try {
        const response = await PATCH(`${API}/${id}`, payload)

        return response
    } catch (error) {
        throw new Error(`Failed to fetch article with given id ${id}`)
    }
}

export const rateArticle = async (id: string, rate: number) => {
    try {
        const response = await PATCH(`${API}/rate/${id}`, { rate })

        return response
    } catch (error) {
        throw new Error(`Failed to rate article with given id ${id}`)
    }

}

export const initArticleBeforeUpload = async (art: FormData) => {
    try {
        const response = await POST(`${API}/init-art`, art)

        return response
    } catch (error) {
        throw new Error(`Failed to create new article in category`)
    }
}

export const createArticle = async (art: FormData) => {
    try {
        const response = await POST(API, art)

        return response
    } catch (error) {
        throw new Error(`Failed to create new article in category`)
    }
}

export const increasArticleViewers = async (id: string) => {
    try {
        const response = await PATCH(`${API}/view/${id}`, {})

        return response
    } catch (error) {
        throw new Error(`Failed to update viewers list of article with given id ${id}`)
    }
}

export const deleteArticle = async (id: string) => {
    try {
        const response = await DELETE(`${API}/${id}`)

        return response
    } catch (error) {
        throw new Error(`Failed to update viewers list of article with given id ${id}`)
    }
}

export const createNewCategory = async (cat: CreateCatDto) => {
    try {
        const response = await POST(`${API}/cat`, cat)

        return response
    } catch (error) {
        throw new Error(`Failed to create new category by sysadmin at [${new Date().toLocaleDateString()}]`)
    }
}

export const disabledArticle = async (id: string) => {
    try {
        const response = await PATCH(`${API}/disabled/${id}`, {})

        return response
    } catch (error) {
        throw new Error(`Failed to disabled article by sysadmin at [${new Date().toLocaleDateString()}] with the given article id [${id}]`)
    }
}


