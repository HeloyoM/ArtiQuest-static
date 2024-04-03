import React from 'react'
import AppBar from '@mui/material/AppBar'
import { useNavigate } from 'react-router-dom'
import { Toolbar, Button, Box, Menu, useMediaQuery } from '@mui/material'
import NavBtnAction from '../NavBtnAction'
import { AccountCircle, Login as ConnectIcon } from '@mui/icons-material'
import Fade from '@mui/material/Fade'
import CatShortcut from './CatShortcut'
import ArtiShortcut from './ArtiShortcut'
import Badge from '@mui/material/Badge'
import MailIcon from '@mui/icons-material/Mail'

const SysadminAppNav = () => {
    const navigate = useNavigate()

    const openAcceptingScreen = () => {
        navigate('/pending-articles')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Box sx={{ flexGrow: 1 }} />

                    <SimpleBadge openAcceptingScreen={openAcceptingScreen}/>

                    <Box sx={{ display: { md: 'flex' } }}>

                        <NavBtnAction
                            btn={<AccountCircle onClick={() => { }} />} />

                        <NavBtnAction
                            btn={<ConnectIcon onClick={() => { }} />} />


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
    return (
        <Badge badgeContent={4} color="primary">
            <MailIcon color="action" onClick={props.openAcceptingScreen} />
        </Badge>
    );
}