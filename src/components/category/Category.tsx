import { useParams } from 'react-router-dom'
import AppProgress from '../common/AppProgress'
import AppCard from '../common/AppCard'
import './style.css'
import { useQuery } from 'react-query'
import { getArticlesByCategoryId } from '../../api/articles'
import { useQueryClient } from '@tanstack/react-query'
import { ICategory } from '../../interface/category.interface'
import { Article } from '../../interface/article.interface'
import AppPagination from '../common/AppPagination'
import { useEffect, useMemo, useState } from 'react'
import { paginate } from '../../utils/paginate'

const pageSize = 4

const Category = () => {
    const [page, setPage] = useState(1)
    const [articles, setArticles] = useState<any[]>([])

    let { category } = useParams()

    const queryClient = useQueryClient()

    const categoriesData = queryClient.getQueryData(['categories']) as ICategory[]

    const catId = categoriesData.find((c: ICategory) => c.name.trim() === category?.trim())

    const { isLoading, data } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getArticlesByCategoryId(catId?.id!)
    })

    useEffect(() => {
        if (!data) return

        setArticles(data)
    }, [data])

    const handlePaginate = (
        e: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(prev => value)
    }

    const articlesToDisplay = useMemo(() => {
        return paginate(articles, page, pageSize)
    }, [articles, page])

    if (isLoading) return (<AppProgress />)

    return (
        <div className='cat'>

            <h2>{category}</h2>

            <p>Number of articles: {articles.length}</p>

            <div className='cards-container'>
                {articlesToDisplay.map((a: Article<ICategory>, index: number) => (
                    <AppCard item={a} key={a.id} />
                ))}
            </div>

            <AppPagination
                paginate={handlePaginate}
                page={page}
                itemsCount={articles.length}
                pageSize={pageSize} />

        </div>
    )
}

export default Category