import AppChip from '../common/AppChip'
import './style.css'
import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '../../api/article'
import { ICategory } from '../../interface/category.interface'
import AppProgress from '../common/AppProgress'

type Props = {
    isdemo: boolean
}
const ArtiQuest = (props: Props) => {

    const { isLoading, data } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories
    })

    if (isLoading) return (<AppProgress />)

    return (
        <div className='articles'>
            <ul>
                {data?.map((c: ICategory) => (
                    <AppChip cat={c} key={c.id} isdemo={props.isdemo} />
                ))}
            </ul>
        </div>
    )
}

export default ArtiQuest