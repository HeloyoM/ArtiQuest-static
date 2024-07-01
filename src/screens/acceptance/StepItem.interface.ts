import { User } from "../../interface/user.interface"

export interface StepItem {
    id: string
    description: string
    label: string
    author: User
    ttl?: number
}