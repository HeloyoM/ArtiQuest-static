import { List } from '@mui/material'
import AppListItem from './AppListItem'
import { IListItem } from '../../../interface/IListItem.interface'

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