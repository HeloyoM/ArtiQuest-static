import { Popover } from '@mui/material'
import { FC } from 'react'

type PopoverProps = {
    open: boolean
    anchorEl: Element | null | undefined
    close: () => void
    id?: string
    children: any
}
const AppPopover: FC<PopoverProps> = props => {
    const { id, open, anchorEl, children, close } = props
    return (
        <Popover
            id={id}
            open={open && anchorEl !== null}
            anchorEl={anchorEl}
            onClose={close}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}

        >
            {children}
        </Popover>
    )
}

export default AppPopover