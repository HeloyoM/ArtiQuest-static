import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Box, Button, IconButton } from '@mui/material'
import { Delete as DeleteIcon, TurnedIn as TurnedIcon, Image as ImageIcon, Edit as UpdateIcon } from '@mui/icons-material'

import { getAllCategories } from '../../../api/articles'

import AppTable from '../../../components/common/table/AppTable'
import AppPagination from '../../../components/common/AppPagination'
import AppList from '../../../components/common/list/AppList'

import { Article } from '../../../interface/article.interface'

import computRows from './rowDataMapping'
import langsFile from '../../../utils/langs-file.json'
import { paginate } from '../../../utils/paginate'
import useArticleQueries from '../../article/useArticleQueries'
import { categoriesColumns } from './columns-definition'

const CategoriesManagement = () => {
    const [rows, setRows] = React.useState<any[]>([])
    const [open, setOpen] = React.useState(false)
    const [page, setPage] = React.useState(1)

    const { handleDeleteArticle } = useArticleQueries({})

    const { isLoading, data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories
    })

    const categoriesChunk = React.useMemo(() => {
        return paginate(categoriesData, page, 1)
    }, [categoriesData, page])


    React.useEffect(() => {
        if (!categoriesChunk.length) return

        const computedRows = categoriesChunk[0].arts.map((r: Article) => {
            const row = computRows(r.title, r.author.first_name + ' ' + r.author.last_name, r.created, r.viewers.length, r.rank.total, tableOptions(r.id))

            return row
        })

        setRows(computedRows)

    }, [categoriesChunk])

    const handlePaginate = (
        e: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(prev => value)
    }

    const confirmationBeforeDeletion = (id: string) => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    const tableOptions = (id: string) => (
        <React.Fragment>

            <IconButton>
                <DeleteIcon sx={{ color: 'red', cursor: 'pointer' }} onClick={() => confirmationBeforeDeletion(id)} />
            </IconButton>

            <IconButton>
                <UpdateIcon sx={{ color: 'green', cursor: 'pointer' }} /*onClick={() => handleUpdateArticle(id)}*/ />
            </IconButton>

        </React.Fragment>
    )

    const approvalChanges = (
        <Box sx={modalStyle}>
            {langsFile.system.common.approval}
            <Button /*onClick={() => props.handleDeleteArticle(artToEditOrDelete)}*/>{langsFile.casual.yes}</Button>
            <Button onClick={closeModal}>{langsFile.casual.no}</Button>
        </Box >
    )

    const getToalViewers = () => {
        let counter = 0
        for (const a of categoriesChunk[0].arts) {
            counter = counter + a.viewers.length
        }

        return counter
    }

    const getPopularAuthor = () => {
        const authorCounts = categoriesChunk[0].arts.reduce((counts: any, article: Article) => {
            const { id } = article.author
            counts[id!] = (counts[id!] || 0) + 1
            return counts
        }, {})

        let mostPopularAuthorId = ''
        let maxCount = 0
        for (const authorId in authorCounts) {
            if (authorCounts[authorId] > maxCount) {
                mostPopularAuthorId = authorId
                maxCount = authorCounts[authorId]
            }
        }

        const { author } = categoriesChunk[0].arts.find((a: Article) => a.author.id === mostPopularAuthorId)

        return author.first_name + ' ' + author.last_name
    }

    const items = [
        { primary: 'Total articles', secondary: categoriesChunk[0].len, icon: <TurnedIcon /> },
        { primary: 'Viewers', secondary: getToalViewers(), icon: <ImageIcon /> },
        { primary: 'Most popular author', secondary: getPopularAuthor(), icon: <ImageIcon /> },
    ]

    return (
        <React.Fragment>
            <AppTable
                rows={rows}
                columns={categoriesColumns}
                tableTitle={categoriesChunk[0].name}
                handleUpdateArticle={() => { }}
                handleDeleteArticle={handleDeleteArticle}
            />

            <AppPagination
                paginate={handlePaginate}
                page={page}
                itemsCount={categoriesData.length}
                pageSize={1} />

            <AppList items={items} />

        </React.Fragment>
    )
}

export default CategoriesManagement

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}
