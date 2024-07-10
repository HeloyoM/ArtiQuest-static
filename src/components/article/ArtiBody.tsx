import './style.css'
import { convertFromRaw, EditorState, RawDraftContentState } from 'draft-js'
import { useState } from 'react'
import AppEditor from '../common/textEditor/AppEditor'

type Props = {
    body: RawDraftContentState
    isedit: boolean
}

const ArtiBody = (props: Props) => {
    const [rawsContent, setRawsContent] = useState(
        EditorState.createWithContent(
            convertFromRaw(props.body)
        )
    )

    return (
        <main className='art-container'>
            <AppEditor isReadOnly editorState={rawsContent} setRawsContent={setRawsContent} />
        </main>
    )
}

export default ArtiBody