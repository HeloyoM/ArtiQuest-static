export interface ITableColumn {
    id: string
    label: string
    align?: 'right' | 'left' | 'center'
    minWidth?: number
}