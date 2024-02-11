import { List, ListItem, ListItemText } from '@mui/material'
import constants from './constants'

import { IFileLimitations } from './interface/fileErrors.interface'

const FileLimitations = () => {

    const limitationsArray: IFileLimitations[] = Object.values(constants.limitations).map(obj => ({
        title: obj.title,
        description: obj.description
    }))

    return (
        <List style={{ textAlign: 'left', fontWeight: 'bold', margin: '5% 5%' }}>
            limitations:

            {limitationsArray.map((l: IFileLimitations) => (
                <ListItem>
                    {l.title}
                    <ListItemText primary={l.description} />
                </ListItem>
            ))}

        </List>
    )
}

export default FileLimitations