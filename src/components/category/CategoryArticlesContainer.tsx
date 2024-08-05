import React, { FC } from 'react'
import AppCard from '../common/AppCard'
import AppRating from '../common/AppRating'
import { Box, Paper, Stack } from '@mui/material'
import { Article } from '../../interface/article.interface'
import { ICategory } from '../../interface/category.interface'

type Props = {
    articlesChunk: Article<ICategory>[]
    category: ICategory
    categoryDisplay: boolean
    handleSaveLastPage: () => void
}
const CategoryArticlesContainer = (props: Props) => {

    const { articlesChunk, category, categoryDisplay, handleSaveLastPage } = props

    if (!articlesChunk.length) return <></>

    return (
        <Box className='cards-container' style={{ gridTemplateColumns: categoryDisplay ? 'auto' : 'auto auto' }}>
            {articlesChunk.length && articlesChunk.map((a: Article<ICategory>) => (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                    <AppCard color={category.color!} categoryName={category.name} item={a} key={a.id} handleSaveLastPage={handleSaveLastPage} />

                    <Stack direction="row" spacing={2}>
                        <Item color={category.color}>voters: {a.rank.voters.length ? a.rank.voters.length : 0}</Item>
                        <AppRating readonly value={a?.rank?.total} handleRate={() => { }} />
                        <Item color={category.color}>number of viewers: {a.viewers.length ? a.viewers.length : 0}</Item>
                    </Stack>

                </Box>
            ))}
        </Box>
    )
}
export default CategoryArticlesContainer

type ItemProps = {
    color: string | undefined
    children: any
}
const Item: FC<ItemProps> = (props: ItemProps) => {
    return (<Paper
        sx={{ backgroundColor: props.color, textAlign: 'center', padding: 1, color: 'white' }}>
        {props.children}
    </Paper>)
}