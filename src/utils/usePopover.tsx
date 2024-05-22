import React, { useState } from 'react'

const usePopover = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | SVGSVGElement | null>(null)

    const togglePopover = (event?: React.MouseEvent<SVGSVGElement, MouseEvent>, id?: string) => {
        if (!event?.currentTarget) return
       
        if (id) localStorage.setItem('focused-art', id)

        setAnchorEl(event.currentTarget)
    }

    const closePopover = () => setAnchorEl(null)

    const open = Boolean(anchorEl)
    const id = open ? 'popover' : undefined

    return { open, id, togglePopover, closePopover, anchorEl }
}

export default usePopover