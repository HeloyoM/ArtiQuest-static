export interface IPost<T> {
    id: string
    art_id: string
    body: string
    createdAt: string
    sender: T
    category: string
}