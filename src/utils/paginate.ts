export function paginate(items: any[], pageNumber: number, pageSize: number): any[] {
    const startIndex = (pageNumber - 1) * pageSize
    return items.slice(startIndex, startIndex + pageSize)
}