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
import constants from '../../utils/system/constants'
import useCategoryQueries from './useCategoryQueries'
import localStorageKeys from '../../utils/localStorageKeys'
import AppUserContext from '../../contextes/AppUserContext'

const Category = () => {
    const [page, setPage] = React.useState(1)
    const [articles, setArticles] = React.useState<any[]>([])
    const [insertionOpen, setInsertionOpen] = React.useState(false)
    const [uploading, setUploading] = React.useState(false)
    const [errorWithUpload, setErrorWithUpload] = React.useState<UploadErrors>({
        fileSizeInMB: false,
        fileExtension: false
    })

    const { user } = React.useContext(AppUserContext)

    let { category, id } = useParams()

    const { categoryArticles } = useCategoryQueries({ id })

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
        setError: setErrorWithUpload
    })

    const handleSaveLastPage = () => {
        localStorage.setItem(`${localStorageKeys.CATEGORY_PAGE}${id}`, page.toString())
    }

    const clearStorageCateroy = () => {
        localStorage.removeItem(`${localStorageKeys.CATEGORY_PAGE}${id}`)
    }

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

                    {user && <AddCircleOutlineOutlinedIcon onClick={openInsertionModal} />}
                </div>

                <p>Number of articles: {articles.length}</p>

                <div className='cards-container'>
                    {articlesChunk.filter((a: Article<ICategory>) => a.active).map((a: Article<ICategory>) => (
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
                    error={errorWithUpload}
                    isUploading={uploading}
                    category={{ name: category, id }} />}
                openMenu={insertionOpen}
                close={closeInsertion} />

        </React.Fragment>
    )
}

export default Category