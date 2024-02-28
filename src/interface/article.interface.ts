import { IArticleRank } from "./IArticleRank.interface"
import { User } from "./user.interface"

export interface Article<T = string> {
    id: string
    title: string
    sub_title: string
    author: User
    created: Date
    cat: T
    body: T
    rank: IArticleRank
}