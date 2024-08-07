import { RawDraftContentState } from "draft-js"
import { IArticleRank } from "./IArticleRank.interface"
import { User } from "./user.interface"

export interface Article<T = string> {
    id: string
    title: string
    sub_title: string
    author: User
    createdAt: string
    cat: T
    body: RawDraftContentState
    rank: IArticleRank
    viewers: string[]
    active: boolean
    ttl?: number
}