import './style.css'
import { convertFromRaw, EditorState, RawDraftContentState } from 'draft-js'
import MyEditor from '../artEditor/MyEditor'
import { useState } from 'react'

type Props = {
    body: RawDraftContentState
    isedit: boolean
    handleEditParagraph: (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void
}

const ArtiBody = (props: Props) => {
    const [rawsContent, setRawsContent] = useState(
        EditorState.createWithContent(
            convertFromRaw(props.body)
        )
    )

    return (
        <main className='art-container'>
            <MyEditor isReadOnly editorState={rawsContent} setRawsContent={setRawsContent} />
        </main>
    )
}

export default ArtiBody