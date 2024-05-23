interface CategoryTableData {
    title: JSX.Element 
    author: JSX.Element 
    createdAt: string
    viewers: number
    rate: number
    operations: JSX.Element
}

export default function computRows(
    title: JSX.Element,
    author: JSX.Element,
    createdAt: string,
    viewers: number,
    rate: number,
    operations: JSX.Element
): CategoryTableData {
    return { title, author, createdAt, viewers, rate, operations }
}