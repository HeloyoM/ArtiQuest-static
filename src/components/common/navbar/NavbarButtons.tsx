import React from 'react'
import NavBtnAction from './NavBtnAction'
import { AccountCircle, Login as ConnectIcon, Edit } from '@mui/icons-material'
import AppUserContext from '../../../contextes/AppUserContext'

type Props = {
    popover: JSX.Element
    openConnectionForm: () => void
    handleOpenProfile: () => void
    handleOpenAuthorControl: () => void
}
const NavbarButtons = (props: Props) => {
    const { user: crrUser } = React.useContext(AppUserContext)

    const buttons = (<React.Fragment>
        {crrUser &&
            <>
                <NavBtnAction
                    popover={{ elem: props.popover, id: 'account' }}
                    btn={<AccountCircle onClick={props.handleOpenProfile} />} />
                <NavBtnAction
                    btn={<Edit onClick={props.handleOpenAuthorControl} />} /></>}
        <NavBtnAction
            popover={{ elem: props.popover, id: 'account' }}
            btn={<ConnectIcon onClick={props.openConnectionForm} />}
        />
    </React.Fragment>)

    return buttons
}

export default NavbarButtons