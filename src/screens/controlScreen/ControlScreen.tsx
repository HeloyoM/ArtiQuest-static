import React from 'react'

import './style.css'

import { ArrowBack } from '@mui/icons-material'

import { Box, Typography } from '@mui/material'

import CategoriesManagement from '../../components/entities/sysAdmin/manage-cagetories/CategoriesManagement'

const ControlScreen = () => {
    const [editArticle, setEditArticle] = React.useState(false)

    const onEditArticle = (id: string) => {
        setEditArticle(prev => !prev)
    }

    const closeEditArticle = () => {
        setEditArticle(false)
    }

    return (
        <React.Fragment>
            {!editArticle ?
                
                <CategoriesManagement />
                
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