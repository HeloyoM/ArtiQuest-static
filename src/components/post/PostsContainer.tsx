import React from 'react'
import usePostQueries from '../usePostQueries'
import { PostResultDto } from '../../api/dto/PostsResult.dto'
import AppProgress from '../common/AppProgress'
import { Typography } from '@mui/material'
import AppAccordion from '../common/accordion/AppAccordion'
import { User } from '../../interface/user.interface'
import AccordionItem from '../common/accordion/AccordionItem'
import { IPost } from '../../interface/IPost.interface'

type Props = {
    users: User[]
}
const PostsContainer = (props: Props) => {
    // const { artsIncludePosts } = usePostQueries({ users: props.users })

    // const authorArticles: PostResultDto<User>[] = artsIncludePosts()

    // if (!authorArticles) return <AppProgress />

    // const summaries = () => {
    //     const summaryItems: JSX.Element[] = []

    //     for (const { posts } of authorArticles)
    //         posts.forEach((p: IPost<User>) => {
    //             const sender = p.sender

    //             if (typeof sender !== 'string')
    //                 summaryItems.push(<AccordionItem label={sender.first_name + ' ' + sender.last_name} description={p.body} />)

    //         })

    //     return summaryItems
    // }

    return (<></>
        // <Typography>{authorArticles.map((a: PostResultDto<User>) => (
        //     <Typography component='div' sx={{ border: '1px solid lightgrey', width: '20%' }}>
        //         <Typography component='p'>{a.title}</Typography>

        //         <Typography component='div'>

        //             <AppAccordion summaries={summaries()} />

        //         </Typography>
        //     </Typography>
        // ))}</Typography>
    )
}

export default PostsContainer