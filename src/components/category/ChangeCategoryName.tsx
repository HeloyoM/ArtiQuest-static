import React from 'react'
import { Button, TextField } from '@mui/material'
import { Edit } from '@mui/icons-material'
import AppUserContext from '../../contextes/AppUserContext'
import { Roles } from '../../enum/Roles.enum'
import { ICategory } from '../../interface/category.interface'
import useCategoryQueries from './useCategoryQueries'

type Props = {
    category: ICategory
}
const ChangeCategoryName = (props: Props) => {
    const [openInput, setOpenInput] = React.useState(false)
    const [newCategoryName, setNewCategoryName] = React.useState(props.category.name)

    const { user } = React.useContext(AppUserContext)

    const isSysAdmin = user && Roles.SysAdmin === user.role

    const { changeName } = useCategoryQueries({})

    const changeCategoryName = () => {
        setOpenInput(prev => !prev)
    }

    const handleChange = (val: string) => {
        console.log(val)
        setNewCategoryName(val)
    }

    const saveNewName = () => {
        const payload = {
            name: newCategoryName,
            id: props.category.id
        }
        changeName.mutate(payload)
    }

    const displaySaveBtn = () => {
        if (!openInput) return false

        if (newCategoryName === props.category.name.trim())
            return false

        if (!newCategoryName.trim())
            return false

        return true
    }

    return (
        <React.Fragment>

            {isSysAdmin && <Edit onClick={changeCategoryName} />}

            {openInput && <TextField value={newCategoryName} variant='outlined' onChange={e => handleChange(e.target.value)} />}

            {displaySaveBtn() && <Button onClick={saveNewName}>Save</Button>}

        </React.Fragment>
    )
}
export default ChangeCategoryName