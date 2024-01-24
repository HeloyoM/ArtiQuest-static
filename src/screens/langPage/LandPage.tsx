import { useEffect, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../utils/paths'

const LandPage = () => {
    const [text, setText] = useState('')

    const navigate = useNavigate()

    const originalText = [
        `Hello and Welcome to artiQuest website.`,
        `We'r happy you are here.`,
        `Shall we take you on a flight ?`
    ]

    const nav = (path: string) => {
        if (path === Paths.HOME) {
            localStorage.setItem('artiQuest-demo', 'true')
        }
        console.log('nav')
        navigate(`/${path}`)
    }

    const speed = 110

    useEffect(() => {

        let index = 0
        let textIndex = 0

        const interval = setInterval(() => {
            setText('')

            const nextChunk = originalText[textIndex].slice(0, index)
            setText(nextChunk)
            index++

            if (index > originalText[textIndex].length) {
                textIndex++
                index = 0

                if (textIndex >= originalText.length) {
                    clearInterval(interval)
                }
            }
        }, speed)

        return () => clearInterval(interval)
    }, [])

    const introEndes = text === originalText[originalText.length - 1]

    return (
        <>
            <div className='land-page' id="typing-text">
                <p className='cursor'>{text}</p>
            </div>
            {!introEndes
                ? <button className='intro-btn' onClick={() => nav('about')}>skip</button>
                : <button className='intro-btn sure' onClick={() => nav(Paths.HOME)}>Sure!</button>
            }
        </>
    )
}

export default LandPage
