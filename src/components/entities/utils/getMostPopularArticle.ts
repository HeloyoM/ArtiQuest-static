import { Article } from "../../../interface/article.interface"

export default function getPopularArticle(arts: Article[]){
    const articleCounts = arts.reduce((counts: any, article: Article) => {
        const id = article.id
        const viewers = article.viewers.length

        counts[id!] = (counts[id!] || 0) + viewers
        return counts
    }, {})

    let mostPopularArticleId = ''
    let maxCount = 0
    for (const authorId in articleCounts) {
        if (articleCounts[authorId] > maxCount) {
            mostPopularArticleId = authorId
            maxCount = articleCounts[authorId]
        }
    }

    const item = arts.find((a: Article) => a.id === mostPopularArticleId)

    if (item)
        return item.title

}