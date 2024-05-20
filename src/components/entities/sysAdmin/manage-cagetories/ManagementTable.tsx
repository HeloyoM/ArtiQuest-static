import React from 'react'

import { Box, Button, IconButton, Typography } from '@mui/material'
import { VisibilityOff as VisibilityOffIcon, Person as PersonIcon, Info as InfoIcon, Delete as DeleteIcon, TurnedIn as TurnedIcon, Image as ImageIcon, Edit as UpdateIcon } from '@mui/icons-material'


import AppTable from '../../../common/table/AppTable'
import AppPagination from '../../../common/AppPagination'
import AppList from '../../../common/list/AppList'

import { Article } from '../../../../interface/article.interface'

import computRows from './rowDataMapping'
import langsFile from '../../../../utils/langs-file.json'
import { paginate } from '../../../../utils/paginate'
import useArticleQueries from '../../../article/useArticleQueries'
import { categoriesColumns } from './columns-definition'
import getPopularAuthor from '../../utils/getMostPopularAuthor'
import getToalViewers from '../../utils/getTotalArticles'

type Props = {
    tableData: any
    handlePaginate: (e: React.ChangeEvent<unknown>, value: number) => void
    rows: any[]
    page: number
}
const ManagementTable = (props: Props) => {
    const [open, setOpen] = React.useState(false)

    const { handleDeleteArticle, handleToggleActive } = useArticleQueries({})

    const confirmationBeforeDeletion = (id: string) => {
        setOpen(true)
    }

    const toggleActiveArticle = (id: string) => {
        handleToggleActive.mutate(id)
    }

    const closeModal = () => {
        setOpen(false)
    }
    const isDisabledArticle = (id: string) => {
        return Boolean(props.tableData[0].arts.find((a: Article) => (a.id === id)).active)
    }
    const tableOptions = (id: string) => (
        <React.Fragment>

            <IconButton>
                <DeleteIcon sx={{ color: 'red', cursor: 'pointer' }} onClick={() => confirmationBeforeDeletion(id)} />
            </IconButton>

            <IconButton>
                <VisibilityOffIcon
                    sx={{ color: isDisabledArticle(id) ? 'black' : 'red', cursor: 'pointer' }}
                    onClick={() => toggleActiveArticle(id)} />
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

    const items = [
        { primary: 'Total articles', secondary: props.tableData[0].len, icon: <TurnedIcon /> },
        { primary: 'Viewers', secondary: getToalViewers(props.tableData[0].arts), icon: <ImageIcon /> },
        { primary: 'Most popular author', secondary: getPopularAuthor(props.tableData[0].arts), icon: <PersonIcon /> },
    ]

    return (
        <React.Fragment>
            <AppTable
                rows={props.rows}
                columns={categoriesColumns}
                tableTitle={props.tableData[0].name}
                handleUpdateArticle={() => { }}
                handleDeleteArticle={handleDeleteArticle}
            />

            <AppPagination
                paginate={props.handlePaginate}
                page={props.page}
                itemsCount={Number(localStorage.getItem('categories-len'))}
                pageSize={1} />

            <Typography component='div' sx={{ display: 'flex', p: 2 }}>
                <InfoIcon sx={{ mr: 4, color: 'lightgreen' }} />
                <Typography component='p'>Addtional information about category</Typography>
            </Typography>

            <AppList items={items} />

        </React.Fragment>
    )
}

export default ManagementTable

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
