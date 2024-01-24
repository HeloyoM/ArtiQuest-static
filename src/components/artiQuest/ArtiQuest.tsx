import React from 'react'
import AppChip from '../common/AppChip'
import './style.css'

const ArtiQuest = () => {
    const articles = [
        { category: 'frontend', length: 15 },
        { category: 'backend', length: 33 },
        { category: 'devops', length: 2 },
        { category: 'architecture', length: 14 },
    ]

    return (
        <div className='articles'>
            <ul>
                {articles.map(i => (
                    <AppChip name={i.category} length={i.length} />
                ))}
            </ul>
        </div>
    )
}

export default ArtiQuest