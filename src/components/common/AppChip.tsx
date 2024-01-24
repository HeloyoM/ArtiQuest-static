import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../utils/paths'

type Props = {
    item: any
}
const AppChip = (props: Props) => {

    const navigate = useNavigate()

    const handleClick = (id: string) => {
        navigate(`/${Paths.ARTICLE}/${id}`)
    }

    return (
        <Stack direction="row" spacing={1}>
            <Chip
                label={`${props.item.category} (${props.item.length})`}
                color="primary"
                variant="outlined"
                onClick={() => handleClick(props.item.id)} />
        </Stack>
    )
}
export default AppChip