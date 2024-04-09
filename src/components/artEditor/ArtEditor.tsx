import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import AppSteper from '../common/AppSteper'
import AppProgress from '../common/AppProgress'
import { Article } from '../../interface/article.interface'

const ArtEditor = () => {
    const [article, setArticle] = useState<Article | undefined>(undefined)

    const { id } = useParams()

    React.useEffect(() => {
        if (id) {
            const preUploadArticle = localStorage.getItem(`init-${id}`)

            if (preUploadArticle)
                setArticle(JSON.parse(preUploadArticle))
        }
    }, [id])

    if (!article) return (<AppProgress />)


    return (
        <div>
            <AppSteper article={article} />
        </div>
    )
}

export default ArtEditor