import AppBar from '@mui/material/AppBar'
import { useNavigate } from 'react-router-dom'
import { Toolbar, Box } from '@mui/material'
import CatShortcut from './CatShortcut'
import ArtiShortcut from './ArtiShortcut'
import Badge from '@mui/material/Badge'
import MailIcon from '@mui/icons-material/Mail'
import { useCategories } from '../../../category/useCategoryQueries'

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

                    <SimpleBadge openAcceptingScreen={openAcceptingScreen} />

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


type Props = {
    openAcceptingScreen: () => void
}
export function SimpleBadge(props: Props) {
    const { data } = useCategories()
    return (
        <Badge badgeContent={Number(data.length)} color="primary">
            <MailIcon color="action" onClick={props.openAcceptingScreen} />
        </Badge>
    )
}