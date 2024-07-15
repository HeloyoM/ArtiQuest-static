import { TableRow, TableCell, TableBody } from '@mui/material'

type Props = {
    rows: any[]
    columns: any[]
    page: number
    rowsPerPage: number
}

export default function AppTableBody(props: Props) {
    const { columns, page, rows, rowsPerPage } = props

    if (!rows.length) return <></>

    return (
        <TableBody>
            {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1}>
                            {columns.map((column) => {
                                const value = row[column.id]
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                        {value}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    )
                })}
        </TableBody>
    )
}