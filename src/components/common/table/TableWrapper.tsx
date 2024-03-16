import { Paper, TableContainer } from '@mui/material'

interface AppMainTableProps {
    children: React.ReactNode
}
const TableWrapper: React.FC<AppMainTableProps> = ({ children }) => {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                {children}
            </TableContainer>
        </Paper>
    )
}

export default TableWrapper