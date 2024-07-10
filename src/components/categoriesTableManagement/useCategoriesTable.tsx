import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Person as PersonIcon, TurnedIn as TurnedIcon, Image as ImageIcon } from '@mui/icons-material'

import ManagementTable from "../entities/sysAdmin/manage-cagetories/ManagementTable"
import { useCategories } from '../category/useCategoryQueries'
import computRows from '../entities/sysAdmin/manage-cagetories/rowDataMapping'
import RowTableOptions from './RowTableOptions'
import usePopover from '../../utils/usePopover'

import getToalViewers from '../entities/utils/getTotalArticles'
import getPopularAuthor from '../entities/utils/getMostPopularAuthor'
import { paginate } from '../../utils/paginate'

import { ICategory } from '../../interface/category.interface'
import { Article } from '../../interface/article.interface'
import { User } from '../../interface/user.interface'
import { Typography } from '@mui/material'

const useCategoriesTable = () => {
    const [rows, setRows] = useState<any[]>([])
    const [page, setPage] = useState(1)

    const navigate = useNavigate()

    const { data: categories } = useCategories()

    const { open } = usePopover()
    const { pathname } = useLocation()

    const showOnlyInactiveArticles = (): boolean => {
        return pathname === '/pending-articles'
    }

    const categoriesChunk = React.useMemo(() => {
        let cats = categories


        if (showOnlyInactiveArticles()) {
            cats = categories.map((c: ICategory) => {
                const inactiveArts = c.arts.filter((a: Article) => !a.active);
                return { ...c, arts: inactiveArts, len: inactiveArts.length };
            })
        }


        return paginate(cats, page, 1)
    }, [categories, page])

    const goToArticle = (title: string, id: string) => {
        navigate(`/cat/${categoriesChunk[0].name}/art/${title}/${id}`)
    }

    const showAllAutherArticles = (author: User) => {
        navigate(`/cat/${author.first_name}-${author.last_name}/${author.id}`)
    }

    React.useEffect(() => {
        if (!categoriesChunk.length) return

        const computedRows = categoriesChunk[0].arts.map((r: Article) => {
            const row = computRows(
                <Typography sx={typographyStyle} onClick={() => goToArticle(r.title, r.id)}>{r.title}</Typography>,
                <Typography sx={typographyStyle} onClick={() => showAllAutherArticles(r.author)}>
                    {r.author.first_name + ' ' + r.author.last_name}
                </Typography>,
                r.createdAt,
                r.viewers.length,
                r.rank.total,
                <RowTableOptions id={r.id} active={r.active} />
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
        main: <ManagementTable items={categories.length} page={page} rows={rows} tableData={categoriesChunk} handlePaginate={handlePaginate} />
    }
}

export default useCategoriesTable

const typographyStyle = {
    textDecoration: 'underline',
    color: 'blue',
    cursor: 'pointer'
}