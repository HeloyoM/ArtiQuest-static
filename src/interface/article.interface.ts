export interface Article<T = string> {
    id: string
    title: string
    sub_title: string
    auther: string //USER
    created: Date
    cat: T
}