import { User } from "./user.interface"

export interface Article<T = string> {
    id: string
    title: string
    sub_title: string
    auther: User
    created: Date
    cat: T
    body: string
}