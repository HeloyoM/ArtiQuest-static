import { FC, ReactElement } from 'react'
import Tooltip from '@mui/material/Tooltip'

type Props = {
    children: JSX.Element | ReactElement
    title: string
}
const AppTooltip: FC<Props> = ({ children, title }) => {
    return (
        <Tooltip title={title} placement='top'>
            {children}
        </Tooltip>
    )
}

export default AppTooltip