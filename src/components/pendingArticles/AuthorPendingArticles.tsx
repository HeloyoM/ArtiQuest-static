import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Article } from '../../interface/article.interface'
import { ICategory } from '../../interface/category.interface'
import AppCard from '../common/AppCard'
import { getInprogressArtsByAuthorId } from '../../api/article'

const AuthorPendingArticles = () => {

    const { data } = useQuery({ queryKey: ['author-pending-arts'], queryFn: getInprogressArtsByAuthorId })

    return (
        <Box>
            {data && data.map((a: Article<ICategory>) => (<AppCard item={a} key={a.id} />))}
        </Box>
    )
}
export default AuthorPendingArticles