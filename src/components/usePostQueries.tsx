import { useQuery } from '@tanstack/react-query'
import { getPostsByAuthorId } from '../api/post'
import { User } from '../interface/user.interface'
import { useMemo } from 'react'
import { PostResultDto } from '../api/dto/PostsResult.dto'
import { IPost } from '../interface/IPost.interface'

type Props = {
    users: User[]
}

const usePostQueries = (props: Props) => {

    const { isLoading, data } = useQuery({
        queryKey: [`author-related-posts`],
        queryFn: getPostsByAuthorId,
    })

    const artsIncludePosts = () => {
        if (isLoading) return []

        else {

            const arts: PostResultDto<User>[] = data.data.map((a: PostResultDto<string>) => {

                let posts: IPost<User>[] = []

                a.posts.map((p: IPost<string>) => {
                    const sender = props.users?.find((u: User) => u.id === p.sender)

                    if (sender)
                        posts.push({ ...p, sender })
                })

                return { ...a, posts }
            })
            return arts

        }
    }


    return { artsIncludePosts }
}

export default usePostQueries