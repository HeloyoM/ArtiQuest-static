import { Article } from "../../../interface/article.interface"

export default function getToalViewers(arts: Article[]) {
    let counter = 0
    for (const a of arts) {
        counter = counter + a.viewers.length
    }

    return counter
}