import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

type Props = {
    paginate: (event: React.ChangeEvent<unknown>, page: number) => void
    page: number
    itemsCount: number
    pageSize: number
}

const AppPagination = (props: Props) => {
    const pagesCount = Math.ceil(props.itemsCount / props.pageSize)
    const pages = Array.from({ length: pagesCount }, (_, i) => 1 + i)

    return (
        <Stack
            spacing={2}
            sx={{ display: 'flex', alignItems: 'center', marginTop: '2%' }}>
            <Pagination
                count={pages.length}
                page={props.page}
                color="standard"
                onChange={props.paginate}
            />
        </Stack >
    )
}

export default AppPagination