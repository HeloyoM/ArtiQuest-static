import React, { useEffect } from 'react'
import { VisibilityOff as VisibilityOffIcon, Person as PersonIcon, Info as InfoIcon, Delete as DeleteIcon, TurnedIn as TurnedIcon, Image as ImageIcon, Edit as UpdateIcon, CategoryRounded } from '@mui/icons-material'
import ManagementTable from "../components/entities/sysAdmin/manage-cagetories/ManagementTable"
import useArticleQueries from '../components/article/useArticleQueries'
import { paginate } from './paginate'
import useCategoryQueries from '../components/category/useCategoryQueries'
import computRows from '../components/entities/sysAdmin/manage-cagetories/rowDataMapping'
import { Article } from '../interface/article.interface'
import { IconButton } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { ICategory } from '../interface/category.interface'
import getToalViewers from '../components/entities/utils/getTotalArticles'
import getPopularAuthor from '../components/entities/utils/getMostPopularAuthor'

const useCategoriesTable = () => {
    const [rows, setRows] = React.useState<any[]>([])
    const [open, setOpen] = React.useState(false)
    const [page, setPage] = React.useState(1)

    const { categories } = useCategoryQueries({})

    const { handleDeleteArticle, handleToggleActive } = useArticleQueries({})
    const { pathname } = useLocation()

    useEffect(() => {
        if (!categories.data) return

        localStorage.setItem('categories-len', categories.data.length)
    }, [categories.data])

    const isPendingScreen = (): boolean => {
        return pathname === '/pending-articles'
    }

    const categoriesChunk = React.useMemo(() => {
        let cats = categories.data


        if (isPendingScreen()) {
            cats = categories.data.map((c: ICategory) => {
                const inactiveArts = c.arts.filter((a: Article) => !a.active);
                return { ...c, arts: inactiveArts, len: inactiveArts.length };
            })
        }


        return paginate(cats, page, 1)
    }, [categories.data, page])



    React.useEffect(() => {
        if (!categoriesChunk.length) return

        const computedRows = categoriesChunk[0].arts.map((r: Article) => {
            const row = computRows(r.title,
                r.author.first_name + ' ' + r.author.last_name,
                r.created,
                r.viewers.length,
                r.rank.total,
                tableOptions(r.id)
            )

            return row
        })

        setRows(computedRows)

    }, [categoriesChunk])


    const toggleActiveArticle = (id: string) => {
        handleToggleActive.mutate(id)
    }

    const isDisabledArticle = (id: string) => {
        return Boolean(categoriesChunk[0].arts.find((a: Article) => (a.id === id)).active)
    }

    const tableOptions = (id: string) => (
        <React.Fragment>

            <IconButton>
                <DeleteIcon sx={{ color: 'red', cursor: 'pointer' }} /*onClick={() => confirmationBeforeDeletion(id)}*/ />
            </IconButton>

            <IconButton>
                <VisibilityOffIcon
                    sx={{ color: isDisabledArticle(id) ? 'black' : 'red', cursor: 'pointer' }}
                    onClick={() => toggleActiveArticle(id)} />
            </IconButton>

        </React.Fragment>
    )

    const handlePaginate = (
        e: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(prev => value)
    }


    const additionInfoAboutCategory = [
        { primary: 'Total articles', secondary: categoriesChunk[0].len, icon: <TurnedIcon /> },
        { primary: 'Viewers', secondary: getToalViewers(categoriesChunk[0].arts), icon: <ImageIcon /> },
        { primary: 'Most popular author', secondary: getPopularAuthor(categoriesChunk[0].arts), icon: <PersonIcon /> },
    ]


    return { 
        additionInfoAboutCategory,
        main: <ManagementTable page={page} rows={rows} tableData={categoriesChunk} handlePaginate={handlePaginate} /> }
}

export default useCategoriesTable