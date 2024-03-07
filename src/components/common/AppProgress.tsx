import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

type Props = {
    type?: 'Line' | 'Circular'
}

const AppProgress = ({ type }: Props) => {
    const progress: JSX.Element = type === 'Line'
        ? (<LinearProgress />)
        : (<CircularProgress size='2rem' color="secondary" />)

    return (
        <Box sx={{ width: '100%' }}>
            {progress}
        </Box>
    );
}
export default AppProgress