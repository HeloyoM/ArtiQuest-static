import AppSteper from '../common/AppSteper'
import AppProgress from '../common/AppProgress'
import useArticleEditor from './useArticleEditor'

const ArtEditor = () => {
    const { article } = useArticleEditor({})

    if (!article) return (<AppProgress />)

    return (
        <div>
            <AppSteper article={article} />
        </div>
    )
}

export default ArtEditor