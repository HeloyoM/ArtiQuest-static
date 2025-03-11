import React, { useState } from 'react'
import { Box, Button, Chip, Input, Typography, useMediaQuery } from '@mui/material'
import './style.css'

import AppChip from '../common/AppChip'
import { ICategory } from '../../interface/category.interface'
import AppProgress from '../common/AppProgress'
import useCategoryQueries, { useCategories } from '../category/useCategoryQueries'
import AppModal from '../common/modal/AppModal'

const ArtiQuest = () => {
    const [newCategoryForm, setNewCategoryForm] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState('')

    const isMobile = useMediaQuery('(max-width:600px)')

    const { addNewCategory } = useCategoryQueries({})

    const openForm = () => {
        setNewCategoryForm(prev => true)
    }

    const closeForm = () => {
        setNewCategoryForm(prev => false)
    }

    const { isLoading, data } = useCategories()

    if (isLoading) return (<AppProgress />)

    const createCategory = () => {
        openForm()
    }

    const onNameChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (e.target.value.length >= 25) return

        else setNewCategoryName(e.target.value)
    }

    const categoryNameInput = (
        <Box sx={style}>
            <Typography align='center'>suggestion for new category </Typography>
            <Input
                autoFocus
                onChange={(e) => onNameChange(e)}
                name={"name"}
                value={newCategoryName}
            />

            {!!newCategoryName.trim().length && <Button onClick={() => addNewCategory.mutate(newCategoryName)}>Save</Button>}

        </Box>
    )

    return (
        <React.Fragment>
            <Box className='chips-container' sx={{ gridTemplateColumns: isMobile ? 'auto auto' : 'auto auto auto auto' }}>

                {data?.map((c: ICategory) => (
                    <AppChip cat={c} key={c.id} />
                ))}

                {/* <Chip
                        id="chip"
                        label="+"
                        color="primary"
                        variant={"outlined"}
                        onClick={createCategory} /> */}
            </Box>

            <AppModal popupModal open={newCategoryForm} children={categoryNameInput} close={closeForm} />

        </React.Fragment>
    )
}

export default ArtiQuest

const style = {
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