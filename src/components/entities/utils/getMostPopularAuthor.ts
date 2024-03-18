import { Article } from "../../../interface/article.interface"

export default function getPopularAuthor(arts: Article[]) {
    const authorCounts = arts.reduce((counts: any, article: Article) => {
        const { id } = article.author
        counts[id!] = (counts[id!] || 0) + 1
        return counts
    }, {})

    let mostPopularAuthorId = ''
    let maxCount = 0
    for (const authorId in authorCounts) {
        if (authorCounts[authorId] > maxCount) {
            mostPopularAuthorId = authorId
            maxCount = authorCounts[authorId]
        }
    }

    const item = arts.find((a: Article) => a.author.id === mostPopularAuthorId)

    if (item)
        return item.author.first_name + ' ' + item.author.last_name
}