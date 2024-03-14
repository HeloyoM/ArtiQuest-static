import React from 'react'

import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

import './style.css'

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
import useCategoryQueries from './useCategoryQueries'

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

    let { category, id } = useParams()

    const { categoryArticles, uploadingArti } = useCategoryQueries({ id })

    React.useEffect(() => {
        if (!categoryArticles.data) return
    
        setArticles(categoryArticles.data)
    }, [categoryArticles.data])

    React.useEffect(() => {
        const prevPage = localStorage.getItem(`category-${id}`)

        if (prevPage) {
            setPage(JSON.parse(prevPage))

            clearStorageCateroy()
        }
    }, [])

    const openInsertionModal = () => { setInsertionOpen(true) }
    const closeInsertion = () => { setInsertionOpen(false) }

    const { handleArtiFile } = useUpload({
        setIsUploading: setUploading,
        setError: setErrorWithUpload,
        setDocxFile: setSelectedDocs
    })

    const handleSaveLastPage = () => {
        localStorage.setItem(`category-${id}`, page.toString())
    }

    const clearStorageCateroy = () => {
        localStorage.removeItem(`category-${id}`)
    }

    const insertArticle = (sub_title: string) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.readAsDataURL(selectedDocs!)

            const fileExtension = selectedDocs?.name.split('.')!
            reader.onload = () => {
                const base64 = reader.result

                const art: Partial<Article> = {
                    cat: id,
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
        return paginate(articles, page, constants.PAGE_SIZE)
    }, [articles, page])

    if (categoryArticles.isLoading) return (<AppProgress />)

    return (
        <React.Fragment>

            <Box className='cat' component='div'>

                <AppPagination
                    paginate={handlePaginate}
                    page={page}
                    itemsCount={articles.length}
                    pageSize={constants.PAGE_SIZE} />

                <div>
                    <h2>{category}</h2>

                    <AddCircleOutlineOutlinedIcon onClick={openInsertionModal} />
                </div>

                <p>Number of articles: {articles.length}</p>


                <div className='cards-container'>
                    {articlesChunk.map((a: Article<ICategory>) => (
                        <React.Fragment>
                            <Typography sx={{ display: 'flex', flexDirection: 'column' }}>
                                <AppRating readonly value={a?.rank?.total} handleRate={() => { }} />
                                <Typography>voters: {a.rank.voters.length ? a.rank.voters.length : 0}</Typography>
                                <Typography>number of viewers: {a.viewers.length ? a.viewers.length : 0}</Typography>
                            </Typography>
                            <AppCard item={a} key={a.id} handleSaveLastPage={handleSaveLastPage} />
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