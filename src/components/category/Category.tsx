import React, { FC } from 'react'

import { useParams } from 'react-router-dom'
import { Box, Paper, Stack, useMediaQuery } from '@mui/material'

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

import './style.css'

import AppMenu from '../common/AppMenu'
import AppProgress from '../common/AppProgress'

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
import CategoryArticlesContainer from './CategoryArticlesContainer'
import ToggleCategoryDisplayButton from './ToggleCategoryDisplayButton'
import CategoryHeader from './CategoryHeader'

const Category = () => {
    const [page, setPage] = React.useState(1)
    const [category, setCategory] = React.useState<ICategory>({} as ICategory)
    const [insertionOpen, setInsertionOpen] = React.useState(false)
    const [categoryDisplay, setCategoryDisplay] = React.useState(true)

    const { user } = React.useContext(AppUserContext)
    const { updateServerMsgContext } = React.useContext(AppServerMsgContext)

    let { id } = useParams()

    const openInsertionModal = () => { setInsertionOpen(true) }
    const closeInsertion = () => { setInsertionOpen(false) }

    const { categories } = useCategoryQueries({ id })

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

    const toggleCategoryDisplay = () => { setCategoryDisplay(prev => !prev) }

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

        const activeArts = category.arts.filter((a: Article) => a.active)
        return paginate(activeArts, page, constants.PAGE_SIZE)
    }, [category, page])

    if (categories.isLoading || !Object.keys(category).length) return (<AppProgress />)

    return (
        <React.Fragment>

            <CategoryHeader category={category} openInsertionModal={openInsertionModal} />

            {!!articlesChunk.length && <ToggleCategoryDisplayButton categoryDisplay={categoryDisplay} toggleCategoryDisplay={toggleCategoryDisplay} />}

            {!!category.arts.length && <AppPagination
                paginate={handlePaginate}
                page={page}
                itemsCount={category.arts.filter(a => a.active).length}
                pageSize={constants.PAGE_SIZE} />}

            <CategoryArticlesContainer categoryDisplay={categoryDisplay} handleSaveLastPage={handleSaveLastPage} articlesChunk={articlesChunk} category={category} />

            {!articlesChunk.length && user && <p className="empty">Not articles yet<AddCircleOutlineOutlinedIcon className='add-icon' onClick={openInsertionModal} /></p>}

            <AppMenu
                menuBody={<UploadArticleToCategory category={{ name: category.name, id }} />}
                openMenu={insertionOpen}
                close={closeInsertion} />

        </React.Fragment>
    )
}

export default Category
