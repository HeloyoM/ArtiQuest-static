import React from 'react'
import NavBtnAction from './NavBtnAction'
import { Badge } from '@mui/material'
import { Notifications, Mail, AccountCircle, Login as ConnectIcon } from '@mui/icons-material'
import AppUserContext from '../../../contextes/AppUserContext'

type Props = {
    popover: JSX.Element
    openConnectionForm: () => void
}
const NavbarButtons = (props: Props) => {
    const { user: crrUser } = React.useContext(AppUserContext)

    const buttons = (<React.Fragment>
        <NavBtnAction
            popover={{ elem: props.popover, id: 'mail' }}
            btn={
                <Badge badgeContent={0} color="error">
                    <Mail />
                </Badge>}
        />
        <NavBtnAction
            popover={{ elem: props.popover, id: 'notifications' }}
            btn={<Badge badgeContent={0} color="error"
            >
                <Notifications />
            </Badge>}
        />
        {crrUser &&
            <NavBtnAction
                popover={{ elem: props.popover, id: 'account' }}
                btn={<AccountCircle onClick={props.openConnectionForm} />} />}
        <NavBtnAction
            popover={{ elem: props.popover, id: 'account' }}
            btn={<ConnectIcon onClick={props.openConnectionForm} />}
        />
    </React.Fragment>)

    return buttons
}

export default NavbarButtons