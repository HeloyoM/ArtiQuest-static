import React from 'react'
import './style.css'
import { Info as InfoIcon } from '@mui/icons-material'
import useCategoriesTable from '../../components/categoriesTableManagement/useCategoriesTable'
import { Typography } from '@mui/material'
import AppList from '../../components/common/list/AppList'

const ControlScreen = () => {
    const { main, additionInfoAboutCategory } = useCategoriesTable()

    return (
        <React.Fragment>
            {main}

            <Typography component='div' sx={{ display: 'flex', p: 2 }}>
                <InfoIcon sx={{ mr: 4, color: 'lightgreen' }} />
                <Typography component='p'>Addtional information about category</Typography>
            </Typography>

            {additionInfoAboutCategory && <AppList items={additionInfoAboutCategory} />}

        </React.Fragment>
    )
}

export default ControlScreen