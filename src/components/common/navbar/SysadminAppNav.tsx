import React from 'react'
import AppBar from '@mui/material/AppBar'
import { useNavigate } from 'react-router-dom'
import { Toolbar, Button, Box, Menu } from '@mui/material'
import NavBtnAction from './NavBtnAction'
import { AccountCircle, Login as ConnectIcon } from '@mui/icons-material'


const SysadminAppNav = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const navigate = useNavigate()

    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const openControlScreen = () => {
        navigate('/control')
    }

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

                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            style={{ color: 'white' }}
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            MANAGE CATEGORIES
                        </Button>

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            style={{ display: 'inline-grid' }}
                        >
                            <Button onClick={openControlScreen}>NEW</Button>

                            <Button onClick={openControlScreen}>UPDATE</Button>

                            <Button onClick={openControlScreen}>DELETE</Button>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default SysadminAppNav