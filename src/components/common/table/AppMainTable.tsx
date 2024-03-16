import { Table } from '@mui/material'
import TableWrapper from './TableWrapper'

interface AppMainTableProps {
    children: React.ReactNode
}

const AppMainTable: React.FC<AppMainTableProps> = ({ children }) => {
    return (
        <TableWrapper>
            <Table stickyHeader aria-label="sticky table">
                {children}
            </Table>
        </TableWrapper>
    )
}

export default AppMainTable