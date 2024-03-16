import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Menu, useMediaQuery } from '@mui/material'
import Fade from '@mui/material/Fade'

const ArtiShortcut = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const isDesktop = useMediaQuery('(min-width:600px)')

    const navigate = useNavigate()

    const open = Boolean(anchorEl)

    const displayCategoriesOptions = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const openControlScreen = () => {
        navigate('/control')
    }


    return (
        <React.Fragment>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                style={{ color: 'white' }}
                aria-expanded={open ? 'true' : undefined}
                onClick={displayCategoriesOptions}
            >
                MANAGE Articels
            </Button>

            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <Button disabled={!isDesktop} onClick={openControlScreen}>NEW</Button>

                <Button disabled={!isDesktop} onClick={openControlScreen}>UPDATE</Button>

                <Button disabled={!isDesktop} onClick={openControlScreen}>DELETE</Button>
            </Menu>
        </React.Fragment>
    )
}

export default ArtiShortcut