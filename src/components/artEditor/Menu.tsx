import TitleEditor from './TitleEditor'
import './style.css'
import EditorPropertiesWrapper from './EditorPropertiesWrapper'
import { Box } from '@mui/material'
import useArticleEditor from './useArticleEditor'
import AppProgress from '../common/AppProgress'
import PreviewArticleBody from './PreviewArticleBody'

type Props = {
    index: number
    handleNext: () => void
}

const Menu = (props: Props) => {
    const { article, onArticleDetailChanged, handleKeyDown } = useArticleEditor({ handleNext: props.handleNext })

    const { index } = props

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

            {index === 2 && <PreviewArticleBody bodyStr={article.body} />}
        </Box>
    )
}

export default Menu