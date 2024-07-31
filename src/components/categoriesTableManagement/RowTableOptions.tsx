import React from 'react'
import { MoreHoriz } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import usePopover from '../../utils/usePopover'
import AppPopover from '../common/AppPopover'
import ArticleTableItemOptionsList from './ArticleTableItemOptionsList'

type Props = {
    id: string
    active: boolean
}
const RowTableOptions = (props: Props): JSX.Element => {
    const { active, id} = props
    const { anchorEl, closePopover, open, togglePopover } = usePopover()

    const popover = (id: string) => (
        <AppPopover anchorEl={anchorEl} id={id} close={closePopover} open={open} >
            <ArticleTableItemOptionsList id={id} active={active} togglePopover={togglePopover}/>
        </AppPopover>
    )

    return (
        <React.Fragment>
            <IconButton>
                <MoreHoriz onClick={(e) => togglePopover(e)} />
            </IconButton>

            {popover(id)}
        </React.Fragment >
    )
}
export default RowTableOptions