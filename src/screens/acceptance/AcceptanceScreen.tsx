import React from 'react'
import { getAllCategories } from '../../api/articles'
import { useQuery } from '@tanstack/react-query'
import useCategoryQueries from '../../components/category/useCategoryQueries'
import AppMenu from '../../components/common/AppMenu'
import { Button } from '@mui/material'
import { ICategory } from '../../interface/category.interface'

const AcceptanceScreen = () => {

    const { categories } = useCategoryQueries({})

    console.log(categories.data)

    const categoriesList = categories.data.map((c: ICategory) => (<Button>{c.name}</Button>))

    return (
        <AppMenu variant='permanent' openMenu close={()=>{}} menuBody={<></>}/>
    )
}

export default AcceptanceScreen