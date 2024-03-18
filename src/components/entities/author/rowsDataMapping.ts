interface AuthorTableData {
    title: string
    createdAt: string
    viewers: number
    rate: number
    operations: JSX.Element
    cat: string
}

export default function computRows(
    title: string,
    createdAt: string,
    viewers: number,
    rate: number,
    cat: string,
    operations: JSX.Element
): AuthorTableData {
    return { title, createdAt, viewers, rate, cat, operations }
}