import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createArticle, deleteArticle, disabledArticle, editArticleById, increasArticleViewers, rateArticle } from '../../api/article'
import { Article } from '../../interface/article.interface'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../utils/paths'

type Props = {
    setArt?: React.Dispatch<React.SetStateAction<Article<string> | undefined>>
    art?: Article
}
const useArticleQueries = (props: Props) => {

    const { art, setArt } = props

    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const uploadingArti = useMutation({
        mutationFn: (art: any) => createArticle(art),
        mutationKey: ['create-article'],
        onSuccess: (data) => {
            localStorage.removeItem(`init-${data.id}`)

            navigate(`/${Paths.HOME}`)
        }
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

    return { editArticleMutate, uploadingArti, rateArt, handleToggleActive, handleDeleteArticle, handleIncreasViewers }
}

export default useArticleQueries