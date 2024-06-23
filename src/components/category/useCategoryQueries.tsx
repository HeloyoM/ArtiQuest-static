import { useMutation, useQuery } from '@tanstack/react-query'
import { createNewCategory, getAllCategories, getArticlesByCategoryId } from '../../api/article'

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

    const addNewCategory = useMutation({
        mutationFn: (catName: string) => createNewCategory({ name: catName }),
        mutationKey: ['create-category'],
    })

    return { categoryArticles, categories, addNewCategory }
}

export default useCategoryQueries

export const useCategories = () => useQuery({ queryKey: ['categories'], queryFn: getAllCategories })