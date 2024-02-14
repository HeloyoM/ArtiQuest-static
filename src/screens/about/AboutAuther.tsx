import React from 'react'
import { useQuery } from '@tanstack/react-query'
import './style.css'
import AboutSection from './AboutSection'
import { getAboutCV } from '../../api/about'
import { ICV } from '../../interface/icv.interface'
import AppProgress from '../../components/common/AppProgress'

const AboutAuther = () => {
    const [cvContent, setCvContent] = React.useState<ICV>()

    const { isLoading, data } = useQuery({
        queryKey: ['cv'],
        queryFn: () => getAboutCV()
    })

    React.useEffect(() => {
        setCvContent(data)
    }, [data])

    if (!cvContent) return (<AppProgress type='Circular' />)

    return (
        <div>
            <AboutSection title='summary' description={cvContent.fields.summary} />

            <AboutSection title='experience' description={cvContent.fields.experience.map((ex) => (
                <div>
                    <p>{ex.title}</p>
                    <p>{ex.company}</p>
                    <p>{ex.description}</p>
                    <p>{ex.start_date}</p>
                    <p>{ex.end_date}</p>
                </div>
            ))} />
        </div>
    )
}

export default AboutAuther