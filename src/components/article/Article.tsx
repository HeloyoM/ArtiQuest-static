import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Article as IArticle } from '../../interface/article.interface'
import React from 'react'
import { ICategory } from '../../interface/category.interface'
import { Paths } from '../../utils/paths'
import AppProgress from '../common/AppProgress'
import './style.css'
import { getAllCategories } from '../../api/articles'
import ArtiTitle from './ArtiTitle'
import ArtiBody from './ArtiBody'

const Article = () => {
    const [art, setArt] = React.useState<IArticle>()
    const [isedit, setIsedit] = React.useState(false)

    const navigate = useNavigate()
    const { category, name, id } = useParams()

    const { isLoading, data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories
    })

    const toggleEdit = () => { setIsedit(prev => !prev) }

    React.useEffect(() => {

        let currentCategory: ICategory[] = []

        if (!categoriesData) return

        currentCategory = categoriesData?.filter((c: ICategory) => c.name.trim() === category?.trim())

        if (!art) {
            const [crrArt] = currentCategory.map(c => {
                return c.arts.find(a => a.id === id)
            })

            setTimeout(() => {
                if (crrArt) {
                    setArt(crrArt)
                } else {
                    navigate(Paths.NOT_FOUND)
                }
            }, 1500)
        }
    }, [art, categoriesData])

    if (!art) return (<AppProgress />)

    const { auther, body, cat, created, id: artId, sub_title, title } = art


    return (
        <div className='art'>

            <ArtiTitle title={title} art={art} toggleEdit={toggleEdit} />

            <h2>{sub_title}</h2>
            <p>
                <strong>{new Date(created).toLocaleDateString()}</strong>
            </p>

            <div className='auther'>
                <p>{auther.first_name + ' ' + auther.last_name}</p>
                <p>{auther.email}</p>
            </div>

            <ArtiBody body={body} isedit={isedit} />

        </div>
    )
}

export default Article