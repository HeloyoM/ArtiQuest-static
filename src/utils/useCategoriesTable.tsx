import React, { useEffect } from 'react'
import { VisibilityOff as VisibilityOffIcon, Person as PersonIcon, Info as InfoIcon, Delete as DeleteIcon, TurnedIn as TurnedIcon, Image as ImageIcon, Edit as UpdateIcon } from '@mui/icons-material'
import ManagementTable from "../components/entities/sysAdmin/manage-cagetories/ManagementTable"
import useArticleQueries from '../components/article/useArticleQueries'
import { paginate } from './paginate'
import useCategoryQueries from '../components/category/useCategoryQueries'
import computRows from '../components/entities/sysAdmin/manage-cagetories/rowDataMapping'
import { Article } from '../interface/article.interface'
import { IconButton } from '@mui/material'

const useCategoriesTable = () => {
    const [rows, setRows] = React.useState<any[]>([])
    const [open, setOpen] = React.useState(false)
    const [page, setPage] = React.useState(1)

    const { categories } = useCategoryQueries({})

    const { handleDeleteArticle, handleToggleActive } = useArticleQueries({})

    useEffect(() => {
        if (!categories.data) return

        localStorage.setItem('categories-len', categories.data.length)
    }, [categories.data])

    const categoriesChunk = React.useMemo(() => {
        return paginate(categories.data, page, 1)
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

    const tableOptions = (id: string) => (
        <React.Fragment>

            <IconButton>
                <DeleteIcon sx={{ color: 'red', cursor: 'pointer' }} /*onClick={() => confirmationBeforeDeletion(id)}*/ />
            </IconButton>

            <IconButton>
                <VisibilityOffIcon
                    /*sx={{ color: isDisabledArticle(id) ? 'black' : 'red', cursor: 'pointer' }}
                    onClick={() => toggleActiveArticle(id)}*/ />
            </IconButton>

        </React.Fragment>
    )

    const handlePaginate = (
        e: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(prev => value)
    }

    return { main: <ManagementTable page={page} rows={rows} tableData={categoriesChunk} handlePaginate={handlePaginate} /> }
}

export default useCategoriesTable