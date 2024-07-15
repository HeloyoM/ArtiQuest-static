import { Article } from "../../../../interface/article.interface"
import { ICategory } from "../../../../interface/category.interface"
import { useCategories } from "../../../category/useCategoryQueries"
import AppBadge from "../../AppBadge"

type Props = {
    openAcceptingScreen: () => void
}
const PendingListIcon = (props: Props) => {
    const { data } = useCategories()

    let count = 0

    if(!data) return <></> 

    data.map((c: ICategory) => {
        const inactiveArts = c.arts.filter((a: Article) => !a.active)
        count = count + inactiveArts.length
    })

    return (
        <AppBadge count={count} handleClick={props.openAcceptingScreen}/>
    )
}

export default PendingListIcon