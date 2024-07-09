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

        // 2. Apply inline styles (bold, italic, etc.) 
        const styledText = inlineStyleRanges.reduce((acc, range) => {
            const { offset, length, style } = range;
            const styledSegment = <span style={{ fontWeight: style === 'BOLD' ? 'bold' : 'normal', fontStyle: style === 'ITALIC' ? 'italic' : 'normal' }}>{text.substring(offset, offset + length)}</span>;
            return acc.concat(styledSegment);
        }, [] as JSX.Element[]); // Start with an empty array of JSX elements

        // 3. Render the block with the correct element and styled text
        return (
            <Typography component={ElementType} key={block.key}>
                {styledText.length ? styledText : text} {/* If there are styled segments, use them, otherwise just the plain text */}
            </Typography>
        );
    };
    // const paragraphs = Array.isArray(props.body) ? props.body : props.body.split(/[\n\r]+/)
    return (
        <main className='art-container'>
            {props.body.blocks.map(renderBlock)}
            {/*</main>{props.body.blocks.map((block, index) => {
                console.log({ block })
                if (block.type === "header-three") {
                    return (
                        <h3>{block.text}</h3>
                    )
                }
                // const isHeader: RegExpMatchArray | null = paragraph.match(RegExpUtil.headers)

                // if (isHeader?.length) {
                // const header = paragraph.slice(4, paragraph.length - 5)
                return (
                    <Typography
                        gutterBottom
                        // component='h2'
                        paragraph={false}
                        key={index}
                        className='title-index'
                    >
                        {block.text}
                    </Typography>)
                // } else if (!props.isedit) {
                //     return (<Typography component='p' style={{ direction: RegExpUtil.rtl.test(paragraph) ? 'rtl' : 'ltr' }} key={index} className='body-paragraph'>{paragraph}</Typography>)
                // } else {
                //     return (
                //         <div className='textarea-p'>
                //             <textarea
                //                 className='p-edit'
                //                 onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.handleEditParagraph(e, index)}
                //             >
                //                 {paragraph}
                //             </textarea>
                //         </div>
                //     )
                // }
            // })}*/}
        </main>
    )
}

export default ArtiBody