import AppBar from '@mui/material/AppBar'
import { useNavigate } from 'react-router-dom'
import { Toolbar, Box } from '@mui/material'
import CatShortcut from './CatShortcut'
import ArtiShortcut from './ArtiShortcut'
import PendingListIcon from './PendingListIcon'

const SysadminAppNav = () => {

    const navigate = useNavigate()

    const openAcceptingScreen = () => {
        navigate('/pending-articles')
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='secondary'>
                <Toolbar>

                    <Box sx={{ flexGrow: 1 }} />

                    <PendingListIcon openAcceptingScreen={openAcceptingScreen} />

                    <Box sx={{ display: { md: 'flex' } }}>

                        <CatShortcut />

                        <ArtiShortcut />

                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default SysadminAppNav