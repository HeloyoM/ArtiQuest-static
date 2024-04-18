import React from 'react'
import TitleEditor from './TitleEditor'
import './style.css'
import EditorPropertiesWrapper from './EditorPropertiesWrapper'
import { Box } from '@mui/material'
import AppProgress from '../common/AppProgress'
import PreviewArticleBody from './PreviewArticleBody'
import useArticleEditor from '../artEditor/useArticleEditor'
import PdfReview from '../article/arti-pdf/PdfReview'
import PdfTemplate from '../article/arti-pdf/PdfContent'
import AppModal from '../common/modal/AppModal'
import PdfDownloading from '../article/arti-pdf/PdfDownloading'
import { useNavigate } from 'react-router-dom'

type Props = {
    index: number
    handleNext: () => void
    endStage: boolean
}

const Menu = (props: Props) => {
    const [pdfInstance, setPdfInstance] = React.useState<JSX.Element | undefined>(undefined)

    const { index } = props

    const { article, onArticleDetailChanged, handleKeyDown } = useArticleEditor({ handleNext: props.handleNext })

    const navigate = useNavigate()

    React.useEffect(() => {
        const art = localStorage.getItem(`init-${article?.id}`)


        if (art) {

            const artObj = JSON.parse(art)

            if (props.endStage && article) {

                const instance = (<PdfTemplate art={artObj} />)

                setPdfInstance(
                    <div className='pdf-view'>
                        <PdfReview>{instance}</PdfReview>

                        <PdfDownloading art={instance} title={artObj.title} />
                    </div>
                )

                navigate(`/cat/${artObj.cat.name}/art/${artObj.title}/${artObj.id}`)

            }
        }

    }, [props.endStage])

    const closePreview = () => { setPdfInstance(undefined) }

    if (!article) return (<AppProgress />)

    return (
        <Box className='editor-menu'>
            {!index && <EditorPropertiesWrapper header='edit the title of the new article'>
                <TitleEditor
                    handleKeyDown={handleKeyDown}
                    placeholder='title'
                    name="title"
                    value={article?.title!}
                    handleChange={onArticleDetailChanged} />
            </EditorPropertiesWrapper>}

            {index === 1 && <EditorPropertiesWrapper header="edit the sub title of the new article (optional)"><TitleEditor
                name="sub_title"
                placeholder='sub title'
                value={article.sub_title}
                handleKeyDown={handleKeyDown}
                handleChange={onArticleDetailChanged}
            /></EditorPropertiesWrapper>}

            {index === 2 && <PreviewArticleBody endStage={props.endStage} article={article} />}

            {/* <AppModal
                popupModal={false}
                open={Boolean(pdfInstance)}
                close={closePreview}
                children={pdfInstance ? pdfInstance : <></>}
            /> */}
        </Box>
    )
}

export default Menu