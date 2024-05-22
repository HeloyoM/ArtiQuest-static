import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Person as PersonIcon, TurnedIn as TurnedIcon, Image as ImageIcon } from '@mui/icons-material'

import ManagementTable from "../entities/sysAdmin/manage-cagetories/ManagementTable"
import useCategoryQueries from '../category/useCategoryQueries'
import computRows from '../entities/sysAdmin/manage-cagetories/rowDataMapping'
import RowTableOptions from './RowTableOptions'
import usePopover from '../../utils/usePopover'

import getToalViewers from '../entities/utils/getTotalArticles'
import getPopularAuthor from '../entities/utils/getMostPopularAuthor'
import { paginate } from '../../utils/paginate'

import { ICategory } from '../../interface/category.interface'
import { Article } from '../../interface/article.interface'

const useCategoriesTable = () => {
    const [rows, setRows] = React.useState<any[]>([])
    const [page, setPage] = React.useState(1)

    const { categories } = useCategoryQueries({})
    const { open } = usePopover()
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
                <RowTableOptions id={r.id} />
            )

            return row
        })

        setRows(computedRows)

    }, [categoriesChunk, open])

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
        main: <ManagementTable page={page} rows={rows} tableData={categoriesChunk} handlePaginate={handlePaginate} />
    }
}

export default useCategoriesTable