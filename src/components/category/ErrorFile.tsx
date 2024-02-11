import { List, ListItem, Typography } from '@mui/material'
import { UploadErrors } from './interface/fileErrors.interface'

type Props = {
    error: UploadErrors
}
const ErrorFile = (props: Props) => {
    const occueredError = Object.values(props.error)

    if (!occueredError.includes(true)) return <></>

    return (
        <Typography className='error-upload' component='div'>
            <List>
                <ListItem >{props.error.fileSizeInMB && 'file is too big'}</ListItem>
                <ListItem >{props.error.fileExtension && 'type of file is not allowed yet'}</ListItem>
            </List>

        </Typography>
    )
}

export default ErrorFile