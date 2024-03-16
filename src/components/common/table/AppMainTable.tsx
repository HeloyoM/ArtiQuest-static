import { Paper, Table, TableContainer } from '@mui/material'

type Props = {
    children: JSX.Element
}

const AppMainTable = (props: Props) => {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    {props.children}
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default AppMainTable