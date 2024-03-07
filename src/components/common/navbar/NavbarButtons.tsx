import React from 'react'
import NavBtnAction from './NavBtnAction'
import { Badge } from '@mui/material'
import { Notifications, Mail, AccountCircle, Login as ConnectIcon } from '@mui/icons-material'
import AppUserContext from '../../../contextes/AppUserContext'

type Props = {
    popover: JSX.Element
    openConnectionForm: () => void
    handleOpenProfile: () => void
}
const NavbarButtons = (props: Props) => {
    const { user: crrUser } = React.useContext(AppUserContext)
    console.log({ crrUser })
    const buttons = (<React.Fragment>
        {crrUser &&
            <NavBtnAction
                popover={{ elem: props.popover, id: 'account' }}
                btn={<AccountCircle onClick={props.handleOpenProfile} />} />}
        <NavBtnAction
            popover={{ elem: props.popover, id: 'account' }}
            btn={<ConnectIcon onClick={props.openConnectionForm} />}
        />
    </React.Fragment>)

    return buttons
}

export default NavbarButtons