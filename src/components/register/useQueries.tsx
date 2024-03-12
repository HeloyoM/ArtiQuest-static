import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import { register, updateUser } from '../../api/user'
import { User } from '../../interface/user.interface'
import { LoginDto } from '../../api/dto/LoginDto.dto'
import { login, logout, refreshToken } from '../../api/auth'
import React from 'react'
import AppUserContext from '../../contextes/AppUserContext'
import { UpdateUserDto } from '../../api/dto/UpdateUser.dto'

type Props = {
    onLogin?: () => void
    closeRegisterModal?: () => void
}

const useQueries = (props: Props) => {
    const [serverMessage, setServerMessage] = React.useState('')

    const { updateUserContext } = React.useContext(AppUserContext)

    const queryClient = useQueryClient()

    const registerMutate = useMutation({
        mutationFn: (user: User) => register(user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['register'] })
        }
    })

    const logoutMutate = useMutation({
        mutationFn: () => logout(),
    })

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

    const refrshTokenMutate = useMutation({
        mutationFn: refreshToken,
        onSuccess: async (data: any) => {
            if (data.token) {
                localStorage.setItem('token', data.token)
            }
            else throw Error('unable to log in')
        }
    })

    const updateUserMutate = useMutation({
        mutationFn: (payload: UpdateUserDto) => updateUser(payload),
        onSuccess: async (data: any) => {
            if (typeof data === 'string')
                setServerMessage(data)
            else {
                setServerMessage('updated!')

                updateUserContext(data)
            }
        }
    })

    const handleLogout = () => {
        logoutMutate.mutate()

        setTimeout(() => {
            updateUserContext(null)

            localStorage.clear()
        }, 1500)


        if (props.closeRegisterModal)
            props.closeRegisterModal()
    }

    return { registerMutate, loginMutate, logoutMutate, refrshTokenMutate, updateUserMutate, serverMessage, setServerMessage, handleLogout }
}

export default useQueries