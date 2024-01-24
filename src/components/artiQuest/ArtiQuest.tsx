import AppChip from '../common/AppChip'
import './style.css'

type Props = {
    isdemo: boolean
}
const ArtiQuest = (props: Props) => {
    const categories = [
        { id: '1234', name: 'frontend', length: 15 },
        { id: '5678', name: 'backend', length: 33 },
        { id: '9012', name: 'devops', length: 2 },
        { id: '3456', name: 'architecture', length: 14 },
    ]
    return (
        <div className='articles'>
            <ul>
                {categories.map(c => (
                    <AppChip cat={c} key={c.id} isdemo={props.isdemo} />
                ))}
            </ul>
        </div>
    )
}

export default ArtiQuest