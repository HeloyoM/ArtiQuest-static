import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

type Props = {
    name: string
    length: number
}
const AppChip = (props: Props) => {

    const handleClick = () => {
        console.info('You clicked the Chip.')
    }

    return (
        <Stack direction="row" spacing={1}>
            <Chip label={`${props.name} (${props.length})`} color="primary" variant="outlined" onClick={handleClick} />
        </Stack>
    )
}
export default AppChip