import { IPost } from "../../interface/IPost.interface"
import { User } from "../../interface/user.interface"

export interface PostResultDto<T> {
    id: string
    title: string
    active: boolean
    sub_title: string
    author: User
    created: string
    cat: string
    viewers: string[]
    body: string
    posts: IPost<T>[]
}