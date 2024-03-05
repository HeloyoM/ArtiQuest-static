import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import { register, updateUser } from '../../api/user'
import { User } from '../../interface/user.interface'
import { LoginDto } from '../../api/dto/LoginDto.dto'
import { login } from '../../api/auth'
import React from 'react'
import AppUserContext from '../../contextes/AppUserContext'
import { UpdateUserDto } from '../../api/dto/UpdateUser.dto'
import getDecodedUser from '../../api/getDecodedUser'

type Props = {
    onLogin?: () => void
    closeRegisterModal?: () => void
}

const useQueries = (props: Props) => {

    const { updateUserContext } = React.useContext(AppUserContext)

    const queryClient = useQueryClient()

    const handleUpdateUserContext = (users: User[]) => {
        const decodedUser = getDecodedUser()

        if (decodedUser) {
            const userObj = users.find((u: User) => u.id?.toString() === decodedUser.sub?.toString())
        
            updateUserContext(userObj)
        }

    }

    const registerMutate = useMutation({
        mutationFn: (user: User) => register(user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['register'] })
        }
    })

    const handleLogout = () => {
        updateUserContext(null)

        localStorage.removeItem('token')

        props.closeRegisterModal!()
    }

    const loginMutate = useMutation({
        mutationFn: (payload: LoginDto) => login(payload),
        onSuccess: async (data: any) => {
            if (data.token) {
                localStorage.setItem('token', data.token)
                props.onLogin!()
            }
            else throw Error('unable to log in')
        }
    })

    const updateUserMutate = useMutation({
        mutationFn: (payload: UpdateUserDto) => updateUser(payload),
        onSuccess: async (data: any) => {
            const sysUsers = await queryClient.fetchQuery({ queryKey: ['users'] }) as User[]
            console.log({ sysUsers })
            handleUpdateUserContext(sysUsers)
        }
    })

    return { registerMutate, loginMutate, updateUserMutate, handleLogout }
}

export default useQueries