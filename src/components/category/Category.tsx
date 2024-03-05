import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

import './style.css'

import { createArticle, getArticlesByCategoryId } from '../../api/articles'

import AppMenu from '../common/AppMenu'
import AppProgress from '../common/AppProgress'
import AppCard from '../common/AppCard'
import AppRating from '../common/AppRating'
import AppPagination from '../common/AppPagination'
import UploadArticleToCategory from './UploadArticleToCategory'
import useUpload from './useUpload'
import { paginate } from '../../utils/paginate'

import { Article } from '../../interface/article.interface'
import { UploadErrors } from './interface/fileErrors.interface'
import { ICategory } from '../../interface/category.interface'
import constants from './constants'

const Category = () => {
    const [page, setPage] = React.useState(1)
    const [articles, setArticles] = React.useState<any[]>([])
    const [insertionOpen, setInsertionOpen] = React.useState(false)
    const [uploading, setUploading] = React.useState(false)
    const [selectedDocs, setSelectedDocs] = React.useState<File>()
    const [errorWithUpload, setErrorWithUpload] = React.useState<UploadErrors>({
        fileSizeInMB: false,
        fileExtension: false
    })

    const openInsertionModal = () => { setInsertionOpen(true) }

    const closeInsertion = () => { setInsertionOpen(false) }

    const { handleArtiFile } = useUpload({
        setIsUploading: setUploading,
        setError: setErrorWithUpload,
        setDocxFile: setSelectedDocs
    })

    let { category } = useParams()

    const queryClient = useQueryClient()

    const categoriesData = queryClient.getQueryData(['categories']) as ICategory[]

    const catId = categoriesData.find((c: ICategory) => c.name.trim() === category?.trim())

    const { isLoading, data } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getArticlesByCategoryId(catId?.id!)
    })


    React.useEffect(() => {
        if (!data) return

        setArticles(data)
    }, [data])

    const uploadingArti = useMutation({
        mutationFn: (art: Partial<Article>) => createArticle(art),
        mutationKey: ['create-article']
    })

    const insertArticle = (sub_title: string) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.readAsDataURL(selectedDocs!)

            const fileExtension = selectedDocs?.name.split('.')!
            reader.onload = () => {
                const base64 = reader.result

                const art: Partial<Article> = {
                    cat: catId?.id,
                    sub_title,
                    body: base64 as any,
                    title: fileExtension[0]
                }

                resolve(art)
            }
        })
    }

    const handleInsertArticle = async (sub_title: string) => {
        await insertArticle(sub_title)
            .then(res => handleInsertToServer(res))
            .catch((err) => console.log(err))
    }


    const handleInsertToServer = React.useCallback((artData: unknown) => {
        uploadingArti.mutate(artData as Partial<Article>)
    }, [])

    const handlePaginate = (
        e: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(prev => value)
    }

    const articlesChunk = React.useMemo(() => {
        return paginate(articles, page, constants.pageSize)
    }, [articles, page])

    if (isLoading || !categoriesData) return (<AppProgress />)

    return (
        <React.Fragment>

            <Box className='cat' component='div'>

                <AppPagination
                    paginate={handlePaginate}
                    page={page}
                    itemsCount={articles.length}
                    pageSize={constants.pageSize} />

                <div>
                    <h2>{category}</h2>

                    <AddCircleOutlineOutlinedIcon onClick={openInsertionModal} />
                </div>

                <p>Number of articles: {articles.length}</p>


                <div className='cards-container'>
                    {articlesChunk.map((a: Article<ICategory>) => (
                        <React.Fragment>
                            <Typography sx={{ display: 'flex', flexDirection: 'column' }}>
                                <AppRating readonly value={a.rank.total} handleRate={() => { }} />
                                <Typography>voters: {a.rank.voters.length}</Typography>
                                <Typography>number of viewers: {a.viewers.length}</Typography>
                            </Typography>
                            <AppCard item={a} key={a.id} />
                        </React.Fragment>
                    ))}
                </div>


            </Box>

            <AppMenu
                menuBody={<UploadArticleToCategory
                    uploadArticle={handleInsertArticle}
                    selectedDocs={selectedDocs}
                    error={errorWithUpload}
                    isUploading={uploading}
                    handleUploading={handleArtiFile}
                    category={category} />}
                openMenu={insertionOpen}
                close={closeInsertion}
                category={category} />

        </React.Fragment>
    )
}

export default Category