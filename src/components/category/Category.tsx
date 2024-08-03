import React, { FC } from 'react'

import { useParams } from 'react-router-dom'
import { Box, Paper, Stack, styled } from '@mui/material'

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
    const [category, setCategory] = React.useState<ICategory>({} as ICategory)
    const [insertionOpen, setInsertionOpen] = React.useState(false)

    const { user } = React.useContext(AppUserContext)
    const { updateServerMsgContext } = React.useContext(AppServerMsgContext)

    let { category: categoryName, id } = useParams()

    const { /*categoryArticles,*/ categories } = useCategoryQueries({ id })

    React.useEffect(() => {
        if (!categories.data) return

        if (categories.data.status > 400) return updateServerMsgContext(categories.data.error)

        const category = categories.data.find((c: ICategory) => c.id === id)

        setCategory(category)
    }, [categories])

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
        if (!category?.arts?.length) return []

        return paginate(category?.arts!, page, constants.PAGE_SIZE)
    }, [category, page])

    if (categories.isLoading || !Object.keys(category).length) return (<AppProgress />)

    return (
        <React.Fragment>

            <Box sx={{ backgroundColor: category.color }} className='cat' component='div'>

                <div>
                    <h2>{categoryName}</h2>

                    {user && <AddCircleOutlineOutlinedIcon className='add-icon' sx={{ cursor: 'pointer' }} onClick={openInsertionModal} />}
                </div>

                {!!category.arts.length && <p>Number of articles: {category.arts.length}</p>}

            </Box>

            <AppPagination
                paginate={handlePaginate}
                page={page}
                itemsCount={category.arts.length}
                pageSize={constants.PAGE_SIZE} />

            <div className='cards-container'>
                {articlesChunk.length ? articlesChunk.filter((a: Article<ICategory>) => a.active).map((a: Article<ICategory>) => (
                    <Box sx={{ display: 'flex', flexDirection: 'column', }}>

                        <AppCard categoryName={categoryName!} item={a} key={a.id} handleSaveLastPage={handleSaveLastPage} />

                        <Stack direction="row" spacing={2}>
                            <Item color={category.color}>voters: {a.rank.voters.length ? a.rank.voters.length : 0}</Item>
                            <AppRating readonly value={a?.rank?.total} handleRate={() => { }} />
                            <Item color={category.color}>number of viewers: {a.viewers.length ? a.viewers.length : 0}</Item>
                        </Stack>

                    </Box>
                )) : <p>Not articles yet</p>}
            </div>

            <AppMenu
                menuBody={<UploadArticleToCategory category={{ name: categoryName, id }} />}
                openMenu={insertionOpen}
                close={closeInsertion} />

        </React.Fragment>
    )
}

export default Category

type Props = {
    color: string | undefined
    children: any
}
const Item: FC<Props> = (props: Props) => {
    // const component = styled(Paper)(({ theme }) => ({
    //     backgroundColor: props.color,
    //     ...theme.typography.body2,
    //     padding: theme.spacing(1),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // }))

    return <Paper
        sx={{ backgroundColor: props.color, textAlign: 'center', padding: 1, color: 'white' }}>
        {props.children}
    </Paper>
}