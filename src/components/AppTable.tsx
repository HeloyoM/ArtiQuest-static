import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Article } from '../interface/article.interface'

interface Column {
    id: 'title' | 'author' | 'createdAt' | 'viewers' | 'rate'
    label: string
    minWidth?: number
    align?: 'right'
}

const columns: readonly Column[] = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'author', label: 'Author', minWidth: 100 },
    {
        id: 'createdAt',
        label: 'Created on',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'viewers',
        label: 'viewers',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'rate',
        label: 'rate',
        minWidth: 170,
        align: 'right',
    },
]
interface Data {
    title: string
    author: string
    createdAt: string
    viewers: number
    rate: number
}

function createData(
    title: string,
    author: string,
    createdAt: string,
    viewers: number,
    rate: number
): Data {
    return { title, author, createdAt, viewers, rate }
}

type Props = {
    rows: Article[]
}
export const AppTable = (props: Props) => {
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [rows, setRows] = React.useState<Data[]>([])


    React.useEffect(() => {
        if(!props.rows.length) return

        const computedRows = props.rows.map((r: Article) => {
           const row =  createData(r.title, r.author.first_name + ' ' + r.author.last_name, r.created, r.viewers.length, r.rank.total)
        
            return row
        })

        setRows(computedRows)

    }, [props.rows.length])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
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
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default AppTable