import React from 'react'
import { useQuery } from '@tanstack/react-query'
import './style.css'
import { ArrowBack } from '@mui/icons-material'
import { getAllCategories } from '../../api/articles'
import AppTable from '../../components/AppTable'
import AppPagination from '../../components/common/AppPagination'
import { paginate } from '../../utils/paginate'
import useArticleQueries from '../../components/article/useArticleQueries'
import { Box, Typography } from '@mui/material'


const ControlScreen = () => {
    const [editArticle, setEditArticle] = React.useState(false)
    const [page, setPage] = React.useState(1)

    const { isLoading, data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories
    })

    const { handleDeleteArticle } = useArticleQueries({})

    const onEditArticle = (id: string) => {
        setEditArticle(prev => !prev)
    }

    const closeEditArticle = () => {
        setEditArticle(false)
    }

    const handlePaginate = (
        e: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(prev => value)
    }

    const categoriesChunk = React.useMemo(() => {
        return paginate(categoriesData, page, 1)
    }, [categoriesData, page])


    return (
        <React.Fragment>
            {!editArticle ?
                <React.Fragment>
                    <AppTable
                        handleUpdateArticle={onEditArticle}
                        handleDeleteArticle={handleDeleteArticle}
                        rows={categoriesChunk[0].arts}
                        category={categoriesChunk[0].name} />

                    <AppPagination
                        paginate={handlePaginate}
                        page={page}
                        itemsCount={categoriesData.length}
                        pageSize={1} />
                </React.Fragment>
                :
                <Box sx={style} className='edit-container'>
                    <ArrowBack onClick={closeEditArticle} />

                    <Typography>Edit article</Typography>
                </Box>
            }

            
        </React.Fragment>
    )
}

export default ControlScreen

const style = {
    bgcolor: 'background.paper',
    width: '100%',
    border: '1px solid lightgrey',
    p: 4,
    position: 'relative',
    top: '20%'
}