import React from 'react'
import './style.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { editArticleById, getAllCategories, increasArticleViewers, rateArticle } from '../../api/articles'

import AppProgress from '../common/AppProgress'
import ArtiTitle from './ArtiTitle'
import ArtiBody from './ArtiBody'
import AppRating from '../common/AppRating'
import AppUserContext from '../../contextes/AppUserContext'

import { Paths } from '../../utils/paths'

import { ICategory } from '../../interface/category.interface'
import { Article as IArticle } from '../../interface/article.interface'
import useArticleQueries from './useArticleQueries'

const Article = () => {
    const [art, setArt] = React.useState<IArticle>()
    const [isedit, setIsedit] = React.useState(false)

    const { user } = React.useContext(AppUserContext)

    const { editArticleMutate, handleIncreasViewers, rateArt } = useArticleQueries({ setArt, art })

    const navigate = useNavigate()
    const { category, id } = useParams()

    const { isLoading, data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories
    })

    React.useEffect(() => {
        if (art && user && !art.viewers.includes(user?.id!)) {
            handleIncreasViewers.mutate()
        }
    }, [user, art])

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


    const handleEditParagraph = (
        { target: { value } }: React.ChangeEvent<HTMLTextAreaElement>,
        index: number
    ) => {

    }

    const toggleEdit = () => { setIsedit(prev => !prev) }

    const handleRatingArticle = React.useCallback((val: number) => {
        rateArt.mutate(val)
    }, [])


    if (!art || isLoading || handleIncreasViewers.isPending) return (<AppProgress />)

    const userAlreadyVote = (art.rank.voters.includes(user?.id!))

    const editArticle = () => { editArticleMutate.mutate() }

    const { author, body, created, sub_title, title } = art

    return (
        <div className='art'>

            <ArtiTitle title={title} category={category} art={art} toggleEdit={toggleEdit} editArticleMutate={editArticle} />

            <h2>{sub_title}</h2>
            <p>
                <strong>{new Date(created).toLocaleDateString()}</strong>
            </p>

            <div className='author'>
                <p>{author.first_name + ' ' + author.last_name}</p>

                <p><a href={`mailto:${author.email}`}>{author.email}</a></p>
            </div>

            <ArtiBody
                body={body}
                isedit={isedit}
                handleEditParagraph={handleEditParagraph}
            />

            <div style={style}>
                <AppRating
                    handleRate={handleRatingArticle}
                    value={art.rank.total}
                    readonly={!Boolean(user) || userAlreadyVote} />
                <p>{art.rank.voters.length} people voted</p>
            </div>

        </div>
    )
}

export default Article

const style = {
    margin: '0 15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid lightgrey',
    height: '100%',
    minHeight: '74px',
    borderBottom: 'none'
}