import { useQuery } from '@tanstack/react-query'
import { getAllCategories, getArticlesByCategoryId } from '../../api/article'

type Props = {
    id?: string
}
const useCategoryQueries = (props: Props) => {

    const { id } = props

    const categories = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories,
    })

    const categoryArticles = useQuery({
        queryKey: ['categories-articles'],
        queryFn: () => getArticlesByCategoryId(id!)
    })

    return { categoryArticles, categories }
}

export default useCategoryQueries

export const useCategories = () => useQuery({ queryKey: ['categories'], queryFn: getAllCategories })