import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createArticle, deleteArticle, disabledArticle, editArticleById, getAllArticles, increasArticleViewers, rateArticle } from '../../api/article'
import { Article } from '../../interface/article.interface'
import { useQuery } from '@tanstack/react-query'

type Props = {
    setArt?: React.Dispatch<React.SetStateAction<Article<string> | undefined>>
    art?: Article
}
const useArticleQueries = (props: Props) => {

    const { art, setArt } = props

    const queryClient = useQueryClient()

    const allArticles = useQuery({
        queryKey: ['articles'],
        queryFn: getAllArticles
    })


    const uploadingArti = useMutation({
        mutationFn: (art: any) => createArticle(art),
        mutationKey: ['create-article']
    })

    const editArticleMutate = useMutation({
        mutationFn: () => editArticleById(art?.id!, { body: [], location: [] }),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['edit-article'] })
        }
    })

    const rateArt = useMutation({
        mutationFn: (val: number) => rateArticle(art?.id!, val),

        onSuccess: async (data: any) => {
            if (!art) return

            setArt!(prev => ({ ...prev!, rank: data }))
        }
    })

    const increasViewers = useMutation({
        mutationFn: () => increasArticleViewers(art?.id!),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['edit-article'] })
        }
    })

    const handleIncreasViewers = () => {
        increasViewers.mutate()
    }

    const deleteArticleMutate = useMutation({
        mutationFn: (id: string) => deleteArticle(id)
    })

    const handleToggleActive = useMutation({
        mutationFn: (id: string) => disabledArticle(id),
        onSuccess: async (data: any) => {
            console.log({ data })
        }
    })


    const handleDeleteArticle = (id: string) => {
        deleteArticleMutate.mutate(id)
    }

    return { editArticleMutate, allArticles, uploadingArti, rateArt, handleToggleActive, handleDeleteArticle, handleIncreasViewers }
}

export default useArticleQueries