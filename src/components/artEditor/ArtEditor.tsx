import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const ArtEditor = () => {
    const [article, setArticle] = useState(undefined)

    const { id } = useParams()

    React.useEffect(() => {
        if (id) {
            const preUploadArticle = localStorage.getItem(`init-${id}`)

            if (preUploadArticle)
                setArticle(JSON.parse(preUploadArticle))
        }
    }, [id])
    console.log({ article })
    return (
        <div>
        </div>
    )
}

export default ArtEditor