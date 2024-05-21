import { Box, Typography } from '@mui/material'
import AppProgress from '../../components/common/AppProgress'
import useCategoriesTable from '../../utils/useCategoriesTable'

const AcceptanceScreen = () => {
    const { main } = useCategoriesTable()

    if (!main) return <AppProgress type="Line" />

    return (
        <Box>
            <Typography align="center">Pending articles</Typography>

            {main}
        </Box>
    )
}

export default AcceptanceScreen