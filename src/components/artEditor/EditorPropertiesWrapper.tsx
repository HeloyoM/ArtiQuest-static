import { Typography } from '@mui/material'
import './style.css'

type Props = {
    children: JSX.Element
    header: string
}
const EditorPropertiesWrapper = (props: Props) => {
    return (
        <Typography component="div" className="editor-container">
            <Typography component="p" >{props.header}</Typography>

            {props.children}
        </Typography>
    )
}

export default EditorPropertiesWrapper