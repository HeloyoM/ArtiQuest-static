import { Drawer } from '@mui/material'

type Props = {
    openMenu: boolean
    close: () => void
    menuBody: JSX.Element
    variant?: 'permanent' | 'persistent' | 'temporary'
}

const AppMenu = (props: Props) => {
    const { close, menuBody, openMenu, variant = 'temporary' } = props

    return (
        <Drawer
            variant={variant}
            anchor='left'
            open={openMenu}
            onClose={close}
        >
            {menuBody}
        </Drawer>
    )
}

export default AppMenu