import { TextareaAutosize } from '@mui/material'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import DragItem from './DragItem'
interface Item {
    id: string
    content: any
}

type Props = {
    paragraphs: any
}
const DropableItem = ({ paragraphs }: Props) => {

    const getItems = (body: Item[]): Item[] => {
        let itemIdCounter = 0

        return body.map(b => ({
            content: b,
            id: `item-${itemIdCounter++}`
        }))
    }

    const reorder = (paragraphs: Item[], startIndex: number, endIndex: number): Item[] => {
        const result = Array.from(paragraphs)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
    }

    const onDragEnd = (result: any) => {
        console.log({ result })
        if (!result.destination) {
            return
        }

        const newItems = reorder(paragraphs, result.source.index, result.destination.index)
        // setParagraphs(newItems)
    }

    const main = (
        <Droppable droppableId="droppable">
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                >

                    {paragraphs.map((item: any, index: any) => (
                        <DragItem
                            index={index}
                            item={item}
                            content={
                                <TextareaAutosize
                                    className='paragraphs-editor'
                                    key={index}
                                    value={item.content}
                                // onChange={(e) => handleUpdateParagraph(index, e.target.value)}
                                //onPaste={(e) => handlePaste(e, index)}
                                //onKeyDown={handleKeyDown}
                                //ref={index === paragraphs.length - 1 ? lastTextareaRef : null}
                                />
                            }
                        />
                    ))}

                    {provided.placeholder}

                </div>
            )}
        </Droppable>
    )
    return (<></>)
}

export default DropableItem


const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
    width: 500
})