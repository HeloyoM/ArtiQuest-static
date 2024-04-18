import RegExpUtil from '../../utils/RegExp.util'
import { Typography } from '@mui/material'
import './style.css'

type Props = {
    body: string
    isedit: boolean
    handleEditParagraph: (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void
}

const ArtiBody = (props: Props) => {

    const paragraphs = Array.isArray(props.body) ? props.body : props.body.split(/[\n\r]+/)

    return (
        <main className='art-container'>
            {paragraphs.map((paragraph, index) => {
                const isHeader: RegExpMatchArray | null = paragraph.match(RegExpUtil.headers)

                if (isHeader?.length) {
                    const header = paragraph.slice(4, paragraph.length - 5)
                    return (
                        <Typography
                            gutterBottom
                            component='h2'
                            paragraph={false}
                            key={index}
                            className='title-index'
                        >
                            {header}
                        </Typography>)
                } else if (!props.isedit) {
                    return (<Typography component='p' style={{ direction: RegExpUtil.rtl.test(paragraph) ? 'rtl' : 'ltr' }} key={index} className='body-paragraph'>{paragraph}</Typography>)
                } else {
                    return (
                        <div className='textarea-p'>
                            <textarea
                                className='p-edit'
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.handleEditParagraph(e, index)}
                            >
                                {paragraph}
                            </textarea>
                        </div>
                    )
                }
            })}
        </main>
    )
}

export default ArtiBody