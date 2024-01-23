import { useEffect, useState } from 'react'
import './style.css'

const LandPage = () => {
    const [text, setText] = useState('')
    const originalText = "Hello, I'm typing text!"
    const typingSpeed = 100

    useEffect(() => {
        let index = 0

        const intervalId = setInterval(() => {
            setText(originalText.slice(0, index))
            index++

            if (index > originalText.length) {
                clearInterval(intervalId)
            }
        }, typingSpeed)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className='land-page' id="typing-text">{text}</div>
    )
}

export default LandPage