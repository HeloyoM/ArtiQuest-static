import { Popover, PopoverOrigin } from '@mui/material'
import { FC } from 'react'

type PopoverProps = {
    open: boolean
    anchorEl: Element | null | undefined
    close?: () => void
    id?: string
    children: any
    position: PopoverOrigin
}
const AppPopover: FC<PopoverProps> = props => {
    const { id, position, open, anchorEl, children, close } = props
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={close}
            anchorOrigin={position}
        >
            {children}
        </Popover >
    )
}

export default AppPopover