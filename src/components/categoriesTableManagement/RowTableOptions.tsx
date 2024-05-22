import React from 'react'
import { MoreHoriz } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import usePopover from '../../utils/usePopover'
import AppPopover from '../common/AppPopover'
import ItemOptionsList from './ItemOptionsList'

type Props = {
    id: string
}
const RowTableOptions = (props: Props): JSX.Element => {

    const { anchorEl, closePopover, open, togglePopover } = usePopover()

    const popover = (id: string) => (
        <AppPopover anchorEl={anchorEl} id={id} close={closePopover} open={open} >
            <div></div>
            <ItemOptionsList id={props.id} />
        </AppPopover>
    )

    return (
        <React.Fragment>
            <IconButton>
                <MoreHoriz onClick={(e) => togglePopover(e)} />
            </IconButton>

            {popover(props.id)}
        </React.Fragment >
    )
}
export default RowTableOptions