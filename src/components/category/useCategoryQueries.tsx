import { useMutation, useQuery } from '@tanstack/react-query'
// import { useQuery } from 'react-query'
import { createArticle, getAllCategories, getArticlesByCategoryId, getCategoriesList } from '../../api/article'
import { Article as IArticle } from '../../interface/article.interface'

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
        mutationFn: (art: Partial<IArticle>) => createArticle(art),
        mutationKey: ['create-article']
    })

    // const getCategoriesInfo = useQuery({
    //     queryKey: ['categories-list'],
    //     queryFn: getCategoriesList
    // })

    return { uploadingArti, categoryArticles, categories/*getCategoriesInfo*/ }
}

export default useCategoryQueries