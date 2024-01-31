import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Article as IArticle } from '../../interface/article.interface'
import React from 'react'
import { ICategory } from '../../interface/category.interface'
import { Paths } from '../../utils/paths'
import AppProgress from '../common/AppProgress'
import './style.css'
import { getAllCategories } from '../../api/articles'
import { Theme, Typography, createStyles, makeStyles } from '@mui/material'
import useExportPdf from '../../utils/useExportPdf'

import ArtActions from './ArtAtcions'

// import PdfTemplate from './arti-pdf/PdfContent'

const Article = () => {
    const [art, setArt] = React.useState<IArticle>()

    const navigate = useNavigate()
    const { category, name, id } = useParams()

    // const instance = (<PdfTemplate art={art!} />)

    // const { handleSendPdf } = useExportPdf({ reactPdfInstance: instance })

    // const queryClient = useQueryClient()

    const downloadArticle = () => {

    }

    const { isLoading, data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories
    })

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

    const paragraphs = body.split(/[\n\r]+/)


    return (
        <div className='art'>

            <div className='title'>
                <h1>{title}</h1>
                <ArtActions downloadArticle={downloadArticle} />
            </div>

            <h2>{sub_title}</h2>
            <p><strong>{new Date(created).toLocaleDateString()}</strong></p>
            
            <div className='auther'>
                <p>{auther.first_name + ' ' + auther.last_name}</p>
                <p>{auther.email}</p>
            </div>
            
            <main className='art-container'>
                {paragraphs.map((paragraph, index) => (
                    <Typography component='p' key={index} className='body-paragraph'>{paragraph}</Typography>
                ))}
            </main>
        </div>
    )
}

export default Article