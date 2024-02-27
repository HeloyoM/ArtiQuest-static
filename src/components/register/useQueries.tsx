import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import { register } from '../../api/user'
import { User } from '../../interface/user.interface'
import { LoginDto } from '../../api/dto/LoginDto.dto'
import { login } from '../../api/auth'

type Props = {
    onLogin: () => void
}

const useQueries = (props: Props) => {

    const queryClient = useQueryClient()

    const registerMutate = useMutation({
        mutationFn: (user: User) => register(user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['register'] })
        }
    })

    const loginMutate = useMutation({
        mutationFn: (payload: LoginDto) => login(payload),
        onSuccess: async (data: any) => {
            if (data.token) {
                const user = { token: data.token }
                localStorage.setItem('user', JSON.stringify(user))
                props.onLogin()
            }
            else throw Error('unable to log in')
        }
    })

    return { registerMutate, loginMutate }
}

export default useQueries