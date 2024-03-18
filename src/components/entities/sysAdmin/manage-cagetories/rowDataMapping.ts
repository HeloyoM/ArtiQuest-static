interface CategoryTableData {
    title: string
    author: string
    createdAt: string
    viewers: number
    rate: number
    operations: JSX.Element
}

export default function computRows(
    title: string,
    author: string,
    createdAt: string,
    viewers: number,
    rate: number,
    operations: JSX.Element
): CategoryTableData {
    return { title, author, createdAt, viewers, rate, operations }
}