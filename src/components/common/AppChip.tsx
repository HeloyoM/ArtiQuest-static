import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom'
import { ICategory } from '../../interface/category.interface'

type Props = {
    cat: Partial<ICategory>
}

const AppChip = (props: Props) => {
    const navigate = useNavigate()

    const toCategory = () => {
        navigate(`/cat/${props.cat.name}/${props.cat.id}`)
    }

    return (
        <Stack direction="row" spacing={1}>
            <Chip
                id="chip"
                size="medium"
                label={`${props.cat.name} (${props.cat.len})`}
                sx={{ backgroundColor: props.cat.color }}
                variant={"outlined"}
                onClick={toCategory} />
        </Stack>
    )
}
export default AppChip