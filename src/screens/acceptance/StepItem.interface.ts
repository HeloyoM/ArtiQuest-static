import { User } from "../../interface/user.interface"

export interface StepItem {
    description: string
    label: string
    author: User
    ttl?: number
}