import AppChip from '../common/AppChip'
import './style.css'

const ArtiQuest = () => {
    const articles = [
        { id: '1234', category: 'frontend', length: 15 },
        { id: '5678', category: 'backend', length: 33 },
        { id: '9012', category: 'devops', length: 2 },
        { id: '3456', category: 'architecture', length: 14 },
    ]

    return (
        <div className='articles'>
            <ul>
                {articles.map(i => (
                    <AppChip item={i} key={i.id} />
                ))}
            </ul>
        </div>
    )
}

export default ArtiQuest