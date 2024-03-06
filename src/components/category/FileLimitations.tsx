import { List, ListItem, ListItemText } from '@mui/material'
import constants from './constants'

import { IFileLimitations } from './interface/fileErrors.interface'

const FileLimitations = () => {

    const limitationsArray: IFileLimitations[] = Object.values(constants.LIMITITIONS).map(obj => ({
        title: obj.title,
        description: obj.description
    }))

    return (
        <List sx={{ fontWeight: 'bold' }} >
            limitations:

            {limitationsArray.map((l: IFileLimitations) => (
                <ListItem>
                    {l.title + ' '}
                    <ListItemText primary={l.description} />
                </ListItem>
            ))}

        </List>
    )
}

export default FileLimitations