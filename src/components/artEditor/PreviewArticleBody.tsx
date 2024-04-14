import React from 'react'
import { Box, TextareaAutosize, Typography } from '@mui/material'
import './style.css'
import { Add } from '@mui/icons-material'
import AppProgress from '../common/AppProgress'
import { Delete } from '@mui/icons-material'
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

    const deleteParagraph = (index: number) => {
        setParagraphs(paragraphs.filter((p, i) => i !== index))
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
    if (!paragraphs.length) return (<AppProgress />)

    return (
        <Box className="paragraphs-container">
            {paragraphs.map((p: string, index: number) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    <Delete sx={{ color: 'red', width: 55, height: 55, cursor: 'pointer' }} onClick={() => deleteParagraph(index)} />

                </Box>
            ))}

            <pre>{getParagraphWithNewlines()}</pre>

            <Add className='add-paragraph'
                onClick={addParagraph}
                style={{ width: 45, height: 45 }} />
        </Box>

    )
}

export default PreviewArticleBody