import './style.css'
import { RawDraftContentState } from 'draft-js'
import MyEditor from '../artEditor/MyEditor'

type Props = {
    body: RawDraftContentState
    isedit: boolean
    handleEditParagraph: (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void
}

const ArtiBody = (props: Props) => {

    return (
        <main className='art-container'>
            <MyEditor isReadOnly body={props.body} />
        </main>
    )
}

export default ArtiBody