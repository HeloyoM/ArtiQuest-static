import React from 'react'
import EditorPropertiesWrapper from './EditorPropertiesWrapper'
import TitleEditor from './TitleEditor'
import PreviewArticleBody from './PreviewArticleBody'
import useArticleEditor from './useArticleEditor'
import AppProgress from '../common/AppProgress'

type Props = {
    index: number
    handleNext: () => void
    endStage: boolean
}
const MenuV2 = (props: Props) => {
    const { index, endStage } = props

    const { article, onArticleDetailChanged, handleKeyDown } = useArticleEditor({ handleNext: props.handleNext })

    if (!article) return (<AppProgress type='Line' />)

    return (
        <React.Fragment>
            
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

        </React.Fragment>
    )
}

export default MenuV2