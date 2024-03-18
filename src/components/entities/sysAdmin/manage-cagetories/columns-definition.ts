import { ITableColumn } from "../../../../interface/table-columns.interface"

export const categoriesColumns: ITableColumn[] = [
    {
        id: 'title',
        label: 'Title',
        minWidth: 170
    },
    {
        id: 'author',
        label: 'Author',
        minWidth: 100
    },
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
    }
]