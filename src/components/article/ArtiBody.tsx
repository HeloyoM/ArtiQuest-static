import RegExpUtil from '../../utils/RegExp.util'
import { Typography } from '@mui/material'
import './style.css'

type Props = {
    body: string
    isedit: boolean
}

const ArtiBody = (props: Props) => {

    const paragraphs = props.body.split(/[\n\r]+/)

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
                    return (<Typography component='p' key={index} className='body-paragraph'>{paragraph}</Typography>)
                } else {
                    return (<textarea className='p-edit' >{paragraph}</textarea>)
                }
            })}
        </main>
    )
}

export default ArtiBody