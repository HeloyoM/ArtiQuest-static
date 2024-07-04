import { List, ListItem } from '@mui/material'
import constants from '../../utils/system/constants'

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
                    {l.title} {' '} {l.description}
                </ListItem>
            ))}

        </List>
    )
}

export default FileLimitations