import { DragDropContext } from 'react-beautiful-dnd'

type Props = {
   child: JSX.Element
   onDragEnd: (result: any) => void
}
const AppDragDropContext = ({ child, onDragEnd }: Props) => {
   return <DragDropContext onDragEnd={onDragEnd}>{child}</DragDropContext>

}
export default AppDragDropContext