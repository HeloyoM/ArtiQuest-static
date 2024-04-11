import React from 'react'
import { useParams } from 'react-router-dom'
import { Article } from '../../interface/article.interface'

type Props = {
    handleNext?: () => void
}
const useArticleEditor = (props: Props) => {
    const [article, setArticle] = React.useState<Article | undefined>(undefined)

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

    const handleKeyDown = ({
        key
    }: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (key === 'Enter') {
            props.handleNext!()
        }
    }

    const updatePreparedArticle = (data: any) => {
        localStorage.setItem(`init-${article?.id}`, data)

        setArticle(JSON.parse(data))
    }

    return { article, onArticleDetailChanged, handleKeyDown }
}

export default useArticleEditor