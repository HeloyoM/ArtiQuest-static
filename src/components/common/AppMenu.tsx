import { Drawer } from '@mui/material'

type Props = {
    openMenu: boolean
    category?: string
    close: () => void
    menuBody: JSX.Element
}

const AppMenu = (props: Props) => {

    return (
        <Drawer
            anchor='left'
            open={props.openMenu}
            onClose={props.close}
        >
            {props.menuBody}
        </Drawer>
    )
}

export default AppMenu