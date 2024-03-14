import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteArticle, editArticleById, increasArticleViewers, rateArticle } from '../../api/articles'
import { Article } from '../../interface/article.interface'

type Props = {
    setArt?: React.Dispatch<React.SetStateAction<Article<string> | undefined>>
    art?: Article
}
const useArticleQueries = (props: Props) => {

    const { art, setArt } = props

    const queryClient = useQueryClient()

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
        mutationFn: (id: string) => deleteArticle(id),

        onSuccess: () => {

        }
    })


    const handleDeleteArticle = (id: string) => {
        deleteArticleMutate.mutate(id)
    }

    return { editArticleMutate, rateArt, handleDeleteArticle, handleIncreasViewers }
}

export default useArticleQueries