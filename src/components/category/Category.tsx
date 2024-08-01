import React from 'react'

import { useParams } from 'react-router-dom'
import { Box, Paper, Stack, Typography, styled } from '@mui/material'

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

import './style.css'

import AppMenu from '../common/AppMenu'
import AppProgress from '../common/AppProgress'
import AppCard from '../common/AppCard'
import AppRating from '../common/AppRating'
import AppPagination from '../common/AppPagination'
import UploadArticleToCategory from './UploadArticleToCategory'
import { paginate } from '../../utils/paginate'

import { Article } from '../../interface/article.interface'
import { ICategory } from '../../interface/category.interface'
import constants from '../../utils/system/constants'
import useCategoryQueries from './useCategoryQueries'
import localStorageKeys from '../../utils/localStorageKeys'
import AppUserContext from '../../contextes/AppUserContext'
import AppServerMsgContext from '../../contextes/AppServerMsgContext'

const Category = () => {
    const [page, setPage] = React.useState(1)
    const [articles, setArticles] = React.useState<any[]>([])
    const [insertionOpen, setInsertionOpen] = React.useState(false)

    const { user } = React.useContext(AppUserContext)
    const { updateServerMsgContext } = React.useContext(AppServerMsgContext)

    let { category, id } = useParams()

    const { categoryArticles, categories } = useCategoryQueries({ id })

    React.useEffect(() => {
        if (!categoryArticles.data) return

        if (categoryArticles.data.status > 400) return updateServerMsgContext(categoryArticles.data.error)

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

                <div>
                    <h2>{category}</h2>

                    {user && <AddCircleOutlineOutlinedIcon className='add-icon' sx={{ cursor: 'pointer' }} onClick={openInsertionModal} />}
                </div>

                <p>Number of articles: {articles.length}</p>

            </Box>

            <AppPagination
                paginate={handlePaginate}
                page={page}
                itemsCount={articles.length}
                pageSize={constants.PAGE_SIZE} />

            <div className='cards-container'>
                {articlesChunk.filter((a: Article<ICategory>) => a.active).map((a: Article<ICategory>) => (
                    <Box sx={{ display: 'flex', flexDirection: 'column', }}>

                        <AppCard item={a} key={a.id} handleSaveLastPage={handleSaveLastPage} />

                        {/* <Typography sx={{ display: 'flex', flexDirection: 'row' }}> */}

                        <Stack direction="row" spacing={2}>
                            <Item>voters: {a.rank.voters.length ? a.rank.voters.length : 0}</Item>
                            <AppRating readonly value={a?.rank?.total} handleRate={() => { }} />
                            <Item>number of viewers: {a.viewers.length ? a.viewers.length : 0}</Item>
                        </Stack>

                        {/* </Typography> */}

                    </Box>
                ))}
            </div>

            <AppMenu
                menuBody={<UploadArticleToCategory category={{ name: category, id }} />}
                openMenu={insertionOpen}
                close={closeInsertion} />

        </React.Fragment>
    )
}

export default Category


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));