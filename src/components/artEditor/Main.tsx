import React from 'react'
import './style.css'
import { Box } from '@mui/material'
import AppProgress from '../common/AppProgress'
import useArticleEditor from './useArticleEditor'
import { useNavigate } from 'react-router-dom'
import EditorPropertiesWrapper from './EditorPropertiesWrapper'
import TitleEditor from './TitleEditor'
import PreviewArticleBody from './PreviewArticleBody'

type Props = {
    index: number
    endStage: boolean
}

const Main = (props: Props) => {
    const { endStage, index } = props

    const { article, onArticleDetailChanged } = useArticleEditor()
    const navigate = useNavigate()

    React.useEffect(() => {
        const art = localStorage.getItem(`init-${article?.id}`)

        if (art) {

            const artObj = JSON.parse(art)

            if (endStage && article) {

                navigate(`/cat/${artObj.cat.name}/art/${artObj.title}/${artObj.id}`)

            }
        }

    }, [props.endStage])

    if (!article) return (<AppProgress />)

    return (
        <Box className='editor-menu'>
            {!index && <EditorPropertiesWrapper header='edit the title of the new article'>
                <TitleEditor
                    //handleKeyDown={handleKeyDown}
                    placeholder='title'
                    name="title"
                    value={article?.title!}
                    handleChange={onArticleDetailChanged} />
            </EditorPropertiesWrapper>}

            {index === 1 && <EditorPropertiesWrapper header="edit the sub title of the new article (optional)"><TitleEditor
                name="sub_title"
                placeholder='sub title'
                value={article.sub_title}
                //handleKeyDown={handleKeyDown}
                handleChange={onArticleDetailChanged}
            /></EditorPropertiesWrapper>}

            {index === 2 && <PreviewArticleBody endStage={endStage} article={article} />}

        </Box>
    )
}

export default Main