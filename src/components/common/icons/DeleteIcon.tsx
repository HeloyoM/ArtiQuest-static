import { Add, Delete } from '@mui/icons-material'

type Props = {
    onDelete: () => void
}
const DeleteIcon = (props: Props) => {
    return (
        <Delete
            sx={{ color: 'red', width: 55, height: 55, cursor: 'pointer' }}
            onClick={props.onDelete}
        />
    )
}

export default DeleteIcon