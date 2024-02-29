import { IconButton } from '@mui/material'
import React from 'react'

type Props = {
    btn: React.ReactNode
    popover?: { elem: JSX.Element, id: string }
}
const NavBtnAction = (props: Props) => {
    return (
        <IconButton
            size="large"
            color="inherit"
            edge="end"
            id={props.popover?.id}
        >
            {props.btn}
            {props.popover?.elem}
        </IconButton>
    )
}

export default NavBtnAction