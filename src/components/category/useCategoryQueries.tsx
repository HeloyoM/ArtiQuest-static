import { useMutation, useQuery } from '@tanstack/react-query'
import { createNewCategory, getAllCategories, getArticlesByCategoryId, initArticleBeforeUpload } from '../../api/article'
import localStorageKeys from '../../utils/localStorageKeys'
import { useNavigate } from 'react-router-dom'

type Props = {
    id?: string
}
const useCategoryQueries = (props: Props) => {
    const { id } = props

    const navigate = useNavigate()

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

    const initPendingArticle = useMutation({
        mutationFn: (formData: FormData) => (initArticleBeforeUpload(formData)),
        mutationKey: ['init-art'],
        onSuccess: async (data: any) => {
            if (Object.keys(data).length) {
                localStorage.setItem(`${localStorageKeys.INITIALIZATION_ART}${data.id}`, JSON.stringify(data))

                navigate(`/art-editor/${data.id}`)
            }
        }
    })

    return { categoryArticles, initPendingArticle, categories, addNewCategory }
}

export default useCategoryQueries

export const useCategories = () => useQuery({ queryKey: ['categories'], queryFn: getAllCategories })