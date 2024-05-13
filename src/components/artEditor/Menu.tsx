import React from 'react'
import './style.css'
import { Box } from '@mui/material'
import AppProgress from '../common/AppProgress'
import useArticleEditor from '../artEditor/useArticleEditor'
import { useNavigate } from 'react-router-dom'
import EditorPropertiesWrapper from './EditorPropertiesWrapper'
import TitleEditor from './TitleEditor'
import PreviewArticleBody from './PreviewArticleBody'

type Props = {
    index: number
    handleNext: () => void
    endStage: boolean
}

const Menu = (props: Props) => {
    const { endStage, handleNext, index } = props

    const { article , onArticleDetailChanged, handleKeyDown} = useArticleEditor({ handleNext: handleNext })
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

            {index === 2 && <PreviewArticleBody endStage={endStage} article={article} />}

        </Box>
    )
}

export default Menu