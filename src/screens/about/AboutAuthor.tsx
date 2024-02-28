import React from 'react'
import { useQuery } from '@tanstack/react-query'
import './style.css'
import AboutSection from './AboutSection'
import { getAboutCV } from '../../api/about'
import { ICV } from '../../interface/icv.interface'
import AppProgress from '../../components/common/AppProgress'

const AboutAuthor = () => {
    const [cvContent, setCvContent] = React.useState<ICV>()

    const rowRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        
    }, [cvContent])

    const { isLoading, data } = useQuery({
        queryKey: ['cv'],
        queryFn: () => getAboutCV()
    })

    React.useEffect(() => {
        setCvContent(data)
    }, [data])

    if (!cvContent) return (<AppProgress type='Circular' />)

    return (
        <div ref={rowRef}>
            <AboutSection backgroundColor='#7395AE' title='summary' description={cvContent.fields.summary} />

            <AboutSection backgroundColor='#AFD275' title='experience' description={cvContent.fields.experience.map((ex) => (
                <div>
                    <p>{ex.title}</p>
                    <p>{ex.company}</p>
                    <p>{ex.description}</p>
                    <p>{ex.start_date}</p>
                    <p>{ex.end_date}</p>
                </div>
            ))} />

            <AboutSection backgroundColor='#ADADAD' title='skills' description={Object.values(cvContent.fields.skills).map((s) => (
                <div key={s}>{s}</div>
            ))} />

        </div>
    )
}

export default AboutAuthor