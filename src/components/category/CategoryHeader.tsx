import { Box } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import React from 'react'
import AppUserContext from '../../contextes/AppUserContext'
import { ICategory } from '../../interface/category.interface'

type Props = {
    category: ICategory
    openInsertionModal: () => void
}
const CategoryHeader = (props: Props) => {
    const { category, openInsertionModal } = props
    const { user } = React.useContext(AppUserContext)

    return (
        <Box sx={{ backgroundColor: category.color }} className='cat' component='div'>

            <div>
                <h2 style={{ userSelect: 'none' }}>{category.name}</h2>

                {user && <AddCircleOutlineOutlinedIcon className='add-icon' sx={{ cursor: 'pointer' }} onClick={openInsertionModal} />}

            </div>

            <p>Number of articles: {category.arts.filter(a => a.active).length}</p>

        </Box>

    )
}
export default CategoryHeader