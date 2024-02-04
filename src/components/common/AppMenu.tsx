import React from 'react'
import { Box, Button, Divider, Drawer, Typography } from '@mui/material'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'

type Props = {
    children: JSX.Element
    openMenu: boolean
    category?: string
    close: () => void
    menuBody: JSX.Element
}

const AppMenu = (props: Props) => {

    return (
        <React.Fragment>

            <Drawer
                anchor='left'
                open={props.openMenu}
                onClose={props.close}
            >
                {props.menuBody}
            </Drawer>

        </React.Fragment>
    )
}

export default AppMenu