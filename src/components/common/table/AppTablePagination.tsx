import { TablePagination } from '@mui/material'
import React from 'react'

type Props = {
    rows: any[]
    page: number
    rowsPerPage: number
    handleChangePage: (event: unknown, newPage: number) => void
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AppTablePagination(props: Props) {
    return (
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={props.rows.length}
            rowsPerPage={props.rowsPerPage}
            page={props.page}
            onPageChange={props.handleChangePage}
            onRowsPerPageChange={props.handleChangeRowsPerPage}
        />
    )
}