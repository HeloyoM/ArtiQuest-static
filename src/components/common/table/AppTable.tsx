import * as React from 'react'
import { Typography, TableRow, TablePagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, IconButton, Box, Button } from '@mui/material'
import { Article } from '../../../interface/article.interface'
import { Delete as DeleteIcon, Edit as UpdateIcon } from '@mui/icons-material'
import AppModal from '../modal/AppModal'
import langsFile from '../../../utils/langs-file.json'

interface Column {
    id: 'title' | 'author' | 'createdAt' | 'viewers' | 'rate' | 'operations'
    label: string
    minWidth?: number
    align?: 'right' | 'center'
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
    {
        id: 'operations',
        label: 'options',
        minWidth: 170,
        align: 'center'
    },
]
interface Data {
    title: string
    author: string
    createdAt: string
    viewers: number
    rate: number
    operations: JSX.Element
}

function createData(
    title: string,
    author: string,
    createdAt: string,
    viewers: number,
    rate: number,
    operations: JSX.Element
): Data {
    return { title, author, createdAt, viewers, rate, operations }
}

type Props = {
    rows: Article[]
    category: string
    handleDeleteArticle: (id: string) => void
    handleUpdateArticle: (id: string) => void
}
export const AppTable = (props: Props) => {
    const [artToEditOrDelete, setArtToEditOrDelete] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [rows, setRows] = React.useState<Data[]>([])

    const confirmationBeforeDeletion = (id: string) => {
        setArtToEditOrDelete(id)
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    const tableOptions = (id: string) => (
        <React.Fragment>

            <IconButton>
                <DeleteIcon sx={{ color: 'red', cursor: 'pointer' }} onClick={() => confirmationBeforeDeletion(id)} />
            </IconButton>

            <IconButton>
                <UpdateIcon sx={{ color: 'green', cursor: 'pointer' }} onClick={() => props.handleUpdateArticle(id)} />
            </IconButton>

        </React.Fragment>
    )

    React.useEffect(() => {
        if (!props.rows.length) return

        const computedRows = props.rows.map((r: Article) => {
            const row = createData(r.title, r.author.first_name + ' ' + r.author.last_name, r.created, r.viewers.length, r.rank.total, tableOptions(r.id))

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

    const approvalChanges = (
        <Box sx={modalStyle}>
            {langsFile.system.common.approval}
            <Button onClick={() => props.handleDeleteArticle(artToEditOrDelete)}>{langsFile.casual.yes}</Button>
            <Button onClick={closeModal}>{langsFile.casual.no}</Button>
        </Box >
    )

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>

            <Typography style={{ fontWeight: 'bold' }}>{props.category}</Typography>

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

            <AppModal open={open} close={closeModal} children={approvalChanges} />

        </Paper>
    )
}

export default AppTable


const modalStyle = {
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