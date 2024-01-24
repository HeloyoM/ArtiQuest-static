import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Article = () => {
    const { category, name, id } = useParams()

    return (
        <div>
            this is article page
        </div>
    )
}

export default Article