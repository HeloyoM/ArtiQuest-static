import React, { useState } from 'react'
import { Box } from '@mui/material'
import './style.css'
import AppProgress from '../common/AppProgress'
import useArticleEditor from './useArticleEditor'
import { Article } from '../../interface/article.interface'
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js'
import MyEditor from './MyEditor'

type Props = {
    article: Article<any>
    endStage: boolean
}
const PreviewArticleBody = (props: Props) => {
    const [rawsContent, setRawsContent] = useState(
        EditorState.createWithContent(
            convertFromRaw(props.article.body)
        )
    )

    const { updateBodyArticle } = useArticleEditor()

    const lastTextareaRef = React.useRef<HTMLTextAreaElement>(null)

    React.useEffect(() => {
        if (lastTextareaRef.current)
            lastTextareaRef.current.focus()
    }, [rawsContent])

    React.useEffect(() => {
        updateLocalArticle()
    }, [rawsContent])

    const updateLocalArticle = () => {
        updateBodyArticle(convertToRaw(rawsContent.getCurrentContent()))
    }

    if (!rawsContent) return (<AppProgress />)

    return (
        <React.Fragment>
            <Box className="paragraphs-container">
                <MyEditor isReadOnly={false} setRawsContent={setRawsContent} editorState={rawsContent} />
            </Box>

        </React.Fragment>

    )
}

export default PreviewArticleBody