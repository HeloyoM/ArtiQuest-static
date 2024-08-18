import { EditArticleDto } from './dto/EditArticle.dto'
import { DELETE, GET, PATCH, POST, PUT } from './api-req'
import { CreateCatDto } from './dto/CreateCat.dto'
import { UpdateTtl } from './dto/UpdateTtl.dto'
import { ChangeCatergoryName } from './dto/ChangeCategoryName.dto'

const API = 'art'
const CAT = `/cat`
const IN_PROGRESS = `/in-progress`

export const getAllArticles = async () => {
    try {
        const response = await GET(`${API}`)

        return response
    } catch (error: any) {
        return error.response.data
    }
}

export const getAllCategories = async () => {
    try {
        const response = await GET(`${API}${CAT}`)

        return response
    } catch (error: any) {
        return error.response.data
    }
}

export const changeCategoryName = async (payload: ChangeCatergoryName) => {
    try {
        const response = await PUT(`${API}${CAT}`, payload)

        return response
    } catch (error: any) {
        return error.response.data
    }
}

export const getArticlesByCategoryId = async (id: string) => {
    try {
        const response = await GET(`${API}/findBy/${id}`)

        return response
    } catch (error: any) {
        return error.response.data
    }
}

export const getArticleById = async (id: string) => {
    try {
        const response = await GET(`${API}/findOne/${id}`)

        return response
    } catch (error: any) {
        return error.response.data
    }
}

export const getInprogressArtsByAuthorId = async () => {
    try {
        const response = await GET(`${API}${IN_PROGRESS}/findByAuthor`)

        return response
    } catch (error: any) {
        return error.response.data
    }
}

export const getAllInprogressArts = async () => {
    try {
        const response = await GET(`${API}${IN_PROGRESS}`)

        return response
    } catch (error: any) {
        return error.response.data
    }
}

export const initArticleBeforeUpload = async (art: FormData) => {
    try {
        const response = await POST(`${API}${IN_PROGRESS}`, art)

        return response
    } catch (error: any) {
        return error.response.data
    }
}

export const increasePendingArtTtl = async (payload: UpdateTtl) => {
    try {
        const response = await PATCH(`${API}${IN_PROGRESS}/ttl`, payload)

        return response
    } catch (error: any) {
        return error.response.data
    }
}

export const editArticleById = async (id: string, payload: EditArticleDto) => {
    try {
        const response = await PATCH(`${API}/${id}`, payload)

        return response
    } catch (error: any) {
        return error.response.data
    }
}

export const rateArticle = async (id: string, rate: number) => {
    try {
        const response = await PATCH(`${API}/rate/${id}`, { rate })

        return response
    } catch (error: any) {
        return error.response.data
    }

}

export const createArticle = async (art: FormData) => {
    try {
        const response = await POST(API, art)

        return response
    } catch (error: any) {
        return error.response.data
    }
}

export const increaseArticleViewers = async (id: string) => {
    try {
        const response = await PATCH(`${API}/view/${id}`, {})

        return response
    } catch (error: any) {
        return error.response.data
    }
}

export const deleteArticle = async (id: string) => {
    try {
        const response = await DELETE(`${API}/${id}`)

        return response
    } catch (error: any) {
        return error.response.data
    }
}

export const createNewCategory = async (cat: CreateCatDto) => {
    try {
        const response = await POST(`${API}${CAT}`, cat)

        return response
    } catch (error: any) {
        return error.response.data
    }
}

export const toggleActiveArticle = async (id: string) => {
    try {
        const response = await PATCH(`${API}/active/${id}`, {})

        return response
    } catch (error: any) {
        return error.response.data
    }
}