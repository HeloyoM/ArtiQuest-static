import React from 'react'
import { Box, TextareaAutosize } from '@mui/material'
import './style.css'
import { Add } from '@mui/icons-material'

type Props = {
    bodyStr: string
}
const PreviewArticleBody = (props: Props) => {
    const [paragraphs, setParagraphs] = React.useState<string[]>([props.bodyStr])

    const lastTextareaRef = React.useRef<HTMLTextAreaElement>(null)

    React.useEffect(() => {
        if (lastTextareaRef.current)
            lastTextareaRef.current.focus()
    }, [paragraphs])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()

            addParagraph()
        }
    }

    const addParagraph = () => {
        setParagraphs((prev) => [...prev, ''])
    }

    const getParagraphWithNewlines = () => {
        return paragraphs.map((p, index) => {
            if (index === paragraphs.length - 1) {
                return p
            } else {
                return p + "\n"
            }
        }).join('')
    }
    
    return (
        <Box className="paragraphs-container">
            {paragraphs.map((p: string, index: number) => (
                <TextareaAutosize
                    key={index}
                    value={p}
                    className='paragraphs-editor'
                    onChange={(event) => {
                        const newBodies = [...paragraphs]
                        newBodies[index] = event.target.value
                        setParagraphs(newBodies)
                    }}
                    onKeyDown={handleKeyDown}
                    ref={index === paragraphs.length - 1 ? lastTextareaRef : null}
                />
            ))}

            <pre>{getParagraphWithNewlines()}</pre>

            <Add className='add-paragraph'
                onClick={addParagraph}
                style={{ width: 45, height: 45 }} />
        </Box>

    )
}

export default PreviewArticleBody