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

    const handleLogout = () => {
        updateUserContext(null)

        localStorage.clear()

        if (props.closeRegisterModal)
            props.closeRegisterModal()
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
            if (typeof data === 'string')
                setServerMessage(data)
            else {
                setServerMessage('updated!')

                updateUserContext(data)
            }
        }
    })

    return { registerMutate, loginMutate, updateUserMutate, serverMessage, setServerMessage, handleLogout }
}

export default useQueries