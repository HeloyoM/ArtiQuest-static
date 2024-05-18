import React from 'react'
import { useQuery } from '@tanstack/react-query'
import './style.css'

import { getAllCategories } from '../../api/article'
import { ArrowBack } from '@mui/icons-material'

import { Box, Typography } from '@mui/material'

import CategoriesManagement from '../../components/entities/sysAdmin/manage-cagetories/CategoriesManagement'

const ControlScreen = () => {
    const [editArticle, setEditArticle] = React.useState(false)

    const { isLoading, data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories
    })

    const onEditArticle = (id: string) => {
        setEditArticle(prev => !prev)
    }

    const closeEditArticle = () => {
        setEditArticle(false)
    }

    return (
        <React.Fragment>
            {!editArticle ?

                <CategoriesManagement categoriesData={categoriesData} />

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