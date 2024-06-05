import { Badge } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail'

type Props = {
    count: number
    handleClick: () => void
}
const AppBadge = (props: Props) => {

    return (
        <Badge badgeContent={props.count} color="primary">
            <MailIcon color="action" onClick={props.handleClick} />
        </Badge>
    )
}
export default AppBadge