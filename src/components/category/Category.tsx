import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppProgress from '../common/AppProgress'
import AppCard from '../common/AppCard'
import './style.css'
import { Article } from '../../interface/article.interface'

const Category = () => {
    const [articles, setArticles] = useState<Article[]>([])
    let { category } = useParams()

    useEffect(() => {
        setTimeout(() => {
            setArticles([
                {
                    id: '123',
                    auther: 'Meir Juli',
                    sub_title: 'reactjs',
                    title: 'JS framework',
                    created: new Date(),
                    cat: category || 'Frontend'
                },
            ])
        }, 2500)
    }, [category])

    if (!articles.length) return (<AppProgress />)

    return (
        <div className='cat'>
            <h2>{category}</h2>
            <p>Number of articles: {articles.length}</p>

            <div className='cards-container'>
                {articles.map(i => (
                    <AppCard item={i} key={i.id} />
                ))}
            </div>
        </div>
    )
}

export default Category