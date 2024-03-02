import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Article as IArticle } from '../../interface/article.interface'
import { ICategory } from '../../interface/category.interface'
import { Paths } from '../../utils/paths'
import AppProgress from '../common/AppProgress'
import { editArticleById, getAllCategories, rateArticle } from '../../api/articles'
import ArtiTitle from './ArtiTitle'
import ArtiBody from './ArtiBody'
import './style.css'
import AppRating from '../common/AppRating'
import AppUserContext from '../../contextes/AppUserContext'

const Article = () => {
    const [art, setArt] = React.useState<IArticle>()
    const [isedit, setIsedit] = React.useState(false)

    const { user } = React.useContext(AppUserContext)

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { category, name, id } = useParams()


    const { isLoading, data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories
    })

    const handleEditParagraph = (
        { target: { value } }: React.ChangeEvent<HTMLTextAreaElement>,
        index: number
    ) => {

    }

    const toggleEdit = () => { setIsedit(prev => !prev) }

    React.useEffect(() => {
        let currentCategory: ICategory[] = []

        if (!categoriesData) return
        currentCategory = categoriesData?.filter((c: ICategory) => c.name.trim() === category?.trim())

        if (!art) {
            console.log('effect')
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

    const editArticleMutate = useMutation({
        mutationFn: () => editArticleById(art?.id!, { body: [], location: [] }),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['edit-article'] })
        }
    })

    const rateArt = useMutation({
        mutationFn: (val: number) => rateArticle(art?.id!, val),

        onSuccess: async (data: any) => {
            if (!art) return

           setArt(prev => ({...prev!, rank: data}))
        }
    })

    const handleRatingArticle = React.useCallback((val: number) => {
        rateArt.mutate(val)
    }, [])


    if (!art) return (<AppProgress />)

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

            <div style={{
                margin: '0 15%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid lightgrey',
                height: '100%',
                minHeight: '74px',
                borderBottom: 'none'
            }}>
                <AppRating handleRate={handleRatingArticle} value={art.rank.total} readonly={!Boolean(user)} />
                <p>{art.rank.voters.length} people voted</p>
            </div>

        </div>
    )
}

export default Article