import AppChip from '../common/AppChip'
import './style.css'
import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '../../api/article'
import { ICategory } from '../../interface/category.interface'
import AppProgress from '../common/AppProgress'

const ArtiQuest = () => {

    const { isLoading, data } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories
    })

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