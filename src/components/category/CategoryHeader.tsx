import { Box } from '@mui/material'
import { AddCircleOutlineOutlined } from '@mui/icons-material'
import React from 'react'
import AppUserContext from '../../contextes/AppUserContext'
import { ICategory } from '../../interface/category.interface'
import './style.css'
import ChangeCategoryName from './ChangeCategoryName'

type Props = {
    category: ICategory
    openInsertionModal: () => void
}
const CategoryHeader = (props: Props) => {
    const { category, openInsertionModal } = props
    const { user } = React.useContext(AppUserContext)

    return (
        <Box sx={{ backgroundColor: category.color }} className='category-header' component='div'>

            <div>

                <Box className="category-name">

                    <h2>{category.name}</h2>

                    <ChangeCategoryName category={category} />

                </Box>

                {user && <AddCircleOutlineOutlined className='add-icon' sx={{ cursor: 'pointer' }} onClick={openInsertionModal} />}

            </div>

            <p>Number of articles: {category.arts.filter(a => a.active).length}</p>

        </Box>
    )
}
export default CategoryHeader