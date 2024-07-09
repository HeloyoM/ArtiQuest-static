import React from 'react'
import { Box, TextareaAutosize } from '@mui/material'
import { Add } from '@mui/icons-material'
import './style.css'
import AppProgress from '../common/AppProgress'
import useArticleEditor from './useArticleEditor'
import { Article } from '../../interface/article.interface'
import DeleteIcon from '../common/icons/DeleteIcon'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import AppDragDropContext from '../common/dNd/AppDragDropContext'
import DragItem from '../common/dNd/DragItem'
import { RawDraftContentState } from 'draft-js'

interface Item {
    id: string
    content: any
}
const getItems = (body: RawDraftContentState): Item[] => {
    let itemIdCounter = 0

    return body.blocks.map(content => ({
        content,
        id: `item-${itemIdCounter++}`
    }))
}

const reorder = (paragraphs: Item[], startIndex: number, endIndex: number): Item[] => {
    const result = Array.from(paragraphs)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
    width: 500
})


type Props = {
    article: Article<any>
    endStage: boolean
}
const PreviewArticleBody = (props: Props) => {
    const [paragraphs, setParagraphs] = React.useState<Item[]>(getItems(props.article.body))

    const onDragEnd = (result: any) => {
        console.log({ result })
        if (!result.destination) {
            return
        }

        const newItems = reorder(paragraphs, result.source.index, result.destination.index)
        setParagraphs(newItems)
    }

    const { updateBodyArticle } = useArticleEditor({})

    const lastTextareaRef = React.useRef<HTMLTextAreaElement>(null)

    React.useEffect(() => {
        if (lastTextareaRef.current)
            lastTextareaRef.current.focus()
    }, [paragraphs])

    const handleUpdateParagraph = (index: number, text: string) => {
        const newBodies = [...paragraphs]
        newBodies[index].content = text

        setParagraphs(newBodies)
    }

    const addParagraph = () => {
        setParagraphs((prev) => [...prev, { content: '', id: `${paragraphs.length + 1}` }])
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

    const main = (
        <Droppable droppableId="droppable">
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                >

                    {paragraphs.map((item, index) => (
                        <DragItem
                            index={index}
                            item={item}
                            content={
                                <TextareaAutosize
                                    className='paragraphs-editor'
                                    key={index}
                                    value={item.content}
                                    onChange={(e) => handleUpdateParagraph(index, e.target.value)}
                                    onPaste={(e) => handlePaste(e, index)}
                                    onKeyDown={handleKeyDown}
                                    ref={index === paragraphs.length - 1 ? lastTextareaRef : null}
                                />
                            }
                        />
                    ))}

                    {provided.placeholder}

                </div>
            )}
        </Droppable>
    )

    return (
        <React.Fragment>
            <Box className="paragraphs-container">

                <AppDragDropContext child={main} onDragEnd={onDragEnd} />

                {/* {paragraphs.map((p: string, index: number) => (
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
                ))} */}

                <Add
                    className='add-paragraph'
                    onClick={addParagraph}
                    style={{ width: 45, height: 45 }} />
            </Box>


        </React.Fragment>

    )
}

export default PreviewArticleBody