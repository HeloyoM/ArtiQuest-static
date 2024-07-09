import RegExpUtil from '../../utils/system/RegExp.util'
import { Typography } from '@mui/material'
import './style.css'
import { RawDraftContentState, DraftBlockType } from 'draft-js'

type Props = {
    body: RawDraftContentState
    isedit: boolean
    handleEditParagraph: (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void
}

const ArtiBody = (props: Props) => {
    const renderBlock = (block: RawDraftContentState['blocks'][number]): JSX.Element => {
        const { type, text, inlineStyleRanges } = block;

        // 1. Determine the HTML element for the block type
        let ElementType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'blockquote' | 'pre' = 'p'; // Default to paragraph
        switch (type) {
            case 'header-one': ElementType = 'h1'; break;
            case 'header-two': ElementType = 'h2'; break;
            // ... handle other header types
            case 'blockquote': ElementType = 'blockquote'; break;
            case 'code-block': ElementType = 'pre'; break;
        }

        const styledText = inlineStyleRanges.reduce((acc, range) => {
            const { offset, length, style } = range
            const styledSegment = <span style={{ fontWeight: style === 'BOLD' ? 'bold' : 'normal', fontStyle: style === 'ITALIC' ? 'italic' : 'normal' }}>{text.substring(offset, offset + length)}</span>
            return acc.concat(styledSegment)
        }, [] as JSX.Element[])

        return (
            <Typography component={ElementType} key={block.key}>
                {styledText.length ? styledText : text}
            </Typography>
        )
    }
    return (
        <main className='art-container'>
            {props.body.blocks.map(renderBlock)}
        </main>
    )
}

export default ArtiBody