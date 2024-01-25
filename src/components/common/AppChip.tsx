import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom'

type Props = {
    cat: any
    isdemo: boolean
}

const AppChip = (props: Props) => {
    const navigate = useNavigate()

    const toCategory = () => {
        navigate(`/cat/${props.cat.name}`)
    }

    return (
        <Stack direction="row" spacing={1}>
            <Chip
                id="chip"
                label={`${props.cat.name} (${props.cat.len})`}
                color="primary"
                variant={"outlined"}
                onClick={toCategory} />
        </Stack>
    )
}
export default AppChip