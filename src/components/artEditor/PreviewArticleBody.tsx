import { TextareaAutosize } from '@mui/material'

type Props = {
    bodyStr: string
}
const PreviewArticleBody = (props: Props) => {

    return (
        <TextareaAutosize
            defaultValue={props.bodyStr}
        />

    )
}

export default PreviewArticleBody