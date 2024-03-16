import { List } from '@mui/material'
import AppListItem from './AppListItem'

interface IListItem {
    primary: React.ReactNode
    secondary: React.ReactNode
    icon: any
}

type Props = {
    items: IListItem[]
}
export default function AppList(props: Props) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

            {props.items.map((i) => (
                <AppListItem {...i} />
            ))}

        </List>
    )
}