import React from 'react'
import { Box, TextareaAutosize } from '@mui/material'
import { Add } from '@mui/icons-material'
import './style.css'
import AppProgress from '../common/AppProgress'
import useArticleEditor from './useArticleEditor'
import { Article } from '../../interface/article.interface'
import DeleteIcon from '../common/icons/DeleteIcon'

type Props = {
    article: Article<any>
    endStage: boolean
}
const PreviewArticleBody = (props: Props) => {
    const [paragraphs, setParagraphs] = React.useState<string[]>([props.article.body])

    const { updateBodyArticle } = useArticleEditor({})

    const lastTextareaRef = React.useRef<HTMLTextAreaElement>(null)

    React.useEffect(() => {
        if (lastTextareaRef.current)
            lastTextareaRef.current.focus()
    }, [paragraphs])

    const handleUpdateParagraph = (index: number, text: string) => {
        const newBodies = [...paragraphs]
        newBodies[index] = text

        setParagraphs(newBodies)
    }

    const addParagraph = () => {
        setParagraphs((prev) => [...prev, ''])
    }

    const deleteParagraph = (index: number) => {
        setParagraphs(paragraphs.filter((p, i) => i !== index))
    }

    React.useEffect(() => {
        updateLocalArticle()
    }, [paragraphs])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()

            addParagraph()
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>, index: number) => {
        const pastedText = e.clipboardData.getData('text/plain')

        handleUpdateParagraph(index, pastedText)
    }

    const updateLocalArticle = () => {
        console.log('set paragraph...')
        updateBodyArticle(paragraphs)
    }

    // const getParagraphWithNewlines = () => {
    //     return paragraphs.map((p, index) => {
    //         if (index === paragraphs.length - 1) {
    //             return p
    //         } else {
    //             return p + "\n"
    //         }
    //     })
    // }

    if (!paragraphs.length) return (<AppProgress />)

    return (
        <React.Fragment>
            <Box className="paragraphs-container">

                {paragraphs.map((p: string, index: number) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>

                        <TextareaAutosize
                            className='paragraphs-editor'
                            key={index}
                            value={p}
                            onChange={(e) => handleUpdateParagraph(index, e.target.value)}
                            onPaste={(e) => handlePaste(e, index)}
                            onKeyDown={handleKeyDown}
                            ref={index === paragraphs.length - 1 ? lastTextareaRef : null}
                        />

                        <DeleteIcon onDelete={() => deleteParagraph(index)} />

                    </Box>
                ))}

                <Add
                    className='add-paragraph'
                    onClick={addParagraph}
                    style={{ width: 45, height: 45 }} />
            </Box>


        </React.Fragment>

    )
}

export default PreviewArticleBody