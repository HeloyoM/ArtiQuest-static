import { useMutation } from '@tanstack/react-query'
import { useQuery } from 'react-query'
import { createArticle, getArticlesByCategoryId } from '../../api/articles'
import { Article as IArticle } from '../../interface/article.interface'

type Props = {
    id?: string
}
const useCategoryQueries = (props: Props) => {

    const { id } = props

    const categoryArticles = useQuery({
        queryKey: ['categories'],
        queryFn: () => getArticlesByCategoryId(id!)
    })

    const uploadingArti = useMutation({
        mutationFn: (art: Partial<IArticle>) => createArticle(art),
        mutationKey: ['create-article']
    })

    return { uploadingArti, categoryArticles }
}

export default useCategoryQueries