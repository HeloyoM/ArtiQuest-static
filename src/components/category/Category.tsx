import { useParams } from 'react-router-dom'
import AppProgress from '../common/AppProgress'
import AppCard from '../common/AppCard'
import './style.css'
import { useQuery } from 'react-query'
import { getArticlesByCategoryId } from '../../api/articles'
import { useQueryClient } from '@tanstack/react-query'
import { ICategory } from '../../interface/category.interface'
import { Article } from '../../interface/article.interface'

const Category = () => {
    let { category } = useParams()

    const queryClient = useQueryClient();

    const categoriesData = queryClient.getQueryData(['categories']) as ICategory[]

    const catId = categoriesData.find((c: ICategory) => c.name.trim() === category?.trim())

    const { isLoading, data: articles } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getArticlesByCategoryId(catId?.id!)
    })

    console.log(catId)

    if (isLoading) return (<AppProgress />)

    return (
        <div className='cat'>
            <h2>{category}</h2>
            <p>Number of articles: {articles.length}</p>

            <div className='cards-container'>
                {articles.map((a: Article) => (
                    <AppCard item={a} key={a.id} />
                ))}
            </div>
        </div>
    )
}

export default Category