import { TableRow, TableCell, TableHead } from '@mui/material'

type Props = {
    columns: any[]
}

export default function AppTableHeader(props: Props) {
    return (
        <TableHead>
            <TableRow>
                {props.columns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.align ?? 'right'}
                        style={{ minWidth: column.minWidth }}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}