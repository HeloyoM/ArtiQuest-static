import AppChip from '../common/AppChip'
import './style.css'
import { ICategory } from '../../interface/category.interface'
import AppProgress from '../common/AppProgress'
import { useCategories } from '../category/useCategoryQueries'

const ArtiQuest = () => {

    const { isLoading, data } = useCategories()

    if (isLoading) return (<AppProgress />)

    return (
        <div className='articles'>
            <ul>
                {data?.map((c: ICategory) => (
                    <AppChip cat={c} key={c.id} />
                ))}
            </ul>
        </div>
    )
}

export default ArtiQuest