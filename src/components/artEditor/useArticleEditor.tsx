import React from 'react'
import { useParams } from 'react-router-dom'
import { Article } from '../../interface/article.interface'
import { ICategory } from '../../interface/category.interface'
import localStorageKeys from '../../utils/localStorageKeys'
import { RawDraftContentState } from 'draft-js'

const useArticleEditor = () => {
    const [article, setArticle] = React.useState<Article<ICategory> | undefined>(undefined)

    const { id } = useParams()

    React.useEffect(() => {
        if (id) {
            const preUploadArticle = localStorage.getItem(`init-${id}`)

            if (preUploadArticle)
                setArticle(JSON.parse(preUploadArticle))
        }
    }, [id])

    const onArticleDetailChanged = ({
        target: { value, name } }: React.ChangeEvent<HTMLInputElement>
    ) => {

        if (name === 'title') {
            updatePreparedArticle(JSON.stringify({ ...article, title: value }))
        }

        if (name === 'sub_title') {
            updatePreparedArticle(JSON.stringify({ ...article, sub_title: value }))
        }
    }

    const updateBodyArticle = (rawsContent: RawDraftContentState): void => {
        if (!article || !rawsContent) return

        const updatedArt = { ...article, body: rawsContent }

        updatePreparedArticle(JSON.stringify(updatedArt))
    }

    const updatePreparedArticle = (data: any) => {
        localStorage.setItem(`${localStorageKeys.INITIALIZATION_ART}${article?.id}`, data)

        setArticle(JSON.parse(data))
    }

    return { article, onArticleDetailChanged, updateBodyArticle }
}

export default useArticleEditor