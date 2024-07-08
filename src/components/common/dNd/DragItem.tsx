import { Draggable } from 'react-beautiful-dnd'

type Props = {
    item: any
    index: number
    content: any
}
const DragItem = ({ item, content, index }: Props) => {
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided: any, snapshot: any) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    {content}
                </div>
            )}
        </Draggable>
    )
}
export default DragItem

const grid = 8;

// Styling functions with typing for props
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: "none",
    padding: grid * 2,
    width: '100%',
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle
});