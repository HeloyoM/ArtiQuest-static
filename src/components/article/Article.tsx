import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { Article as IArticle } from '../../interface/article.interface'
import React from 'react'
import { ICategory } from '../../interface/category.interface'
import { Paths } from '../../utils/paths'

const Article = () => {
    const [art, setArt] = React.useState<IArticle>()

    const navigate = useNavigate()
    const { category, name, id } = useParams()

    const queryClient = useQueryClient()

    const categoriesData = queryClient.getQueryData(['categories']) as ICategory[]

    const currentCategory = categoriesData.filter(c => c.name.trim() === category?.trim())

    if (currentCategory.length && !art) {
        const [crrArt] = currentCategory.map(c => {
            return c.arts.find(a => a.id === id)
        })

        if (crrArt) {
            setArt(crrArt)
        } else {
            navigate(Paths.NOT_FOUND)
        }
    }
    console.log(art)
    return (
        <div>

        </div>
    )
}

export default Article