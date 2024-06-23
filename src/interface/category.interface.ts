import { Article } from "./article.interface"

export interface ICategory {
    id: string
    name: string
    color?: string
    len?: number
    arts: Article[]
}