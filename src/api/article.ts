import { EditArticleDto } from './dto/EditArticle.dto'
import { DELETE, GET, PATCH, POST } from './api-req'
import { CreateCatDto } from './dto/CreateCat.dto'
import { UpdateTtl } from './dto/UpdateTtl.dto'

const API = 'art'
const CAT = `/cat`
const IN_PROGRESS = `/in-progress`

export const getAllArticles = async () => {
    try {
        const response = await GET(`${API}`)

        return response
    } catch (error) {
        throw new Error('Failed to fetch categories')
    }
}

export const getAllCategories = async () => {
    try {
        const response = await GET(`${API}${CAT}`)

        return response
    } catch (error) {
        throw new Error('Failed to fetch categories')
    }
}

export const getArticlesByCategoryId = async (id: string) => {
    try {
        const response = await GET(`${API}/findBy/${id}`)

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

export const getInprogressArtsByAuthorId = async () => {
    try {
        const response = await GET(`${API}${IN_PROGRESS}/findByAuthor`)

        return response
    } catch (error) {
        throw new Error(`Failed to fetch categories information, it's may not interrupt you watch categories`)
    }
}

export const getAllInprogressArts = async () => {
    try {
        const response = await GET(`${API}${IN_PROGRESS}`)

        return response
    } catch (error) {
        throw new Error(`Failed to fetch in progress as system admin`)
    }
}

export const initArticleBeforeUpload = async (art: FormData) => {
    try {
        const response = await POST(`${API}${IN_PROGRESS}`, art)

        return response
    } catch (error) {
        throw new Error(`Failed to create new article in category`)
    }
}

export const increasePendingArtTtl = async (payload: UpdateTtl) => {
    try {
        const response = await PATCH(`${API}${IN_PROGRESS}/ttl`, payload)

        return response
    } catch (error) {
        throw new Error(`Unavle to increase ttl of pending article with given ID [${payload.id}]`)
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

export const createArticle = async (art: FormData) => {
    try {
        const response = await POST(API, art)

        return response
    } catch (error) {
        throw new Error(`Failed to create new article in category`)
    }
}

export const increaseArticleViewers = async (id: string) => {
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
        const response = await POST(`${API}${CAT}`, cat)

        return response
    } catch (error) {
        throw new Error(`Failed to create new category by sysadmin at [${new Date().toLocaleDateString()}]`)
    }
}

export const toggleActiveArticle = async (id: string) => {
    try {
        const response = await PATCH(`${API}/active/${id}`, {})

        return response
    } catch (error) {
        throw new Error(`Failed to disabled article by sysadmin at [${new Date().toLocaleDateString()}] with the given article id [${id}]`)
    }
}


