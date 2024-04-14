import { useMutation, useQuery } from '@tanstack/react-query'
import { createArticle, getAllCategories, getArticlesByCategoryId } from '../../api/article'

type Props = {
    id?: string
}
const useCategoryQueries = (props: Props) => {

    const { id } = props

    const categories = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories
    })

    const categoryArticles = useQuery({
        queryKey: ['categories-articles'],
        queryFn: () => getArticlesByCategoryId(id!)
    })

    const uploadingArti = useMutation({
        mutationFn: (art: FormData) => createArticle(art),
        mutationKey: ['create-article']
    })

    return { uploadingArti, categoryArticles, categories }
}

export default useCategoryQueries