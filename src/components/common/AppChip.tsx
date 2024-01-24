import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../utils/paths'

type Props = {
    cat: any
    isdemo: boolean
}

const AppChip = (props: Props) => {
    const navigate = useNavigate()

    const toCategory = () => {
        navigate(`/${Paths.ARTICLE}`)
    }

    return (
        <Stack direction="row" spacing={1}>
            <Chip
                id="chip"
                label={`${props.cat.name} (${props.cat.length})`}
                color="primary"
                variant={"outlined"}
                onClick={toCategory} />
        </Stack>
    )
}
export default AppChip