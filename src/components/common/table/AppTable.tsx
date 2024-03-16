import * as React from 'react'

import AppTableHeader from './AppTableHeader'
import AppTableBody from './AppTableBody'
import AppMainTable from './AppMainTable'
import AppTablePagination from './AppTablePagination'
import { Typography } from '@mui/material'

type Props = {
    tableTitle: string
    rows: any[]
    columns: any[]
    handleDeleteArticle: (id: string) => void
    handleUpdateArticle: (id: string) => void
}

export const AppTable = (props: Props) => {
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }


    return (

        <React.Fragment>

            <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 32 }}>{props.tableTitle}</Typography>

            <AppMainTable>
                <AppTableHeader columns={props.columns} />

                <AppTableBody rows={props.rows} columns={props.columns} page={page} rowsPerPage={rowsPerPage} />
            </AppMainTable >


            <AppTablePagination
                rows={props.rows}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage} />


        </React.Fragment>
    )
}

export default AppTable

