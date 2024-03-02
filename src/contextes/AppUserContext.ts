import { createContext } from 'react'
import { User } from '../interface/user.interface'

export default createContext({
    user: {} as User,
    updateUserContext: (user: any) => { },
})