import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material'

type Props = {
    primary: React.ReactNode
    secondary: React.ReactNode
    icon: any
}
const AppListItem = (props: Props) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    {props.icon}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.primary} secondary={props.secondary} />
        </ListItem>
    )
}

export default AppListItem