import React from 'react'
import AppBar from '@mui/material/AppBar'
import { useNavigate } from 'react-router-dom'
import { Toolbar, Button, Box, Menu, useMediaQuery } from '@mui/material'
import NavBtnAction from '../NavBtnAction'
import { AccountCircle, Login as ConnectIcon } from '@mui/icons-material'
import Fade from '@mui/material/Fade'
import CatShortcut from './CatShortcut'
import ArtiShortcut from './ArtiShortcut'

const SysadminAppNav = () => {


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Box sx={{ flexGrow: 1 }} />

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