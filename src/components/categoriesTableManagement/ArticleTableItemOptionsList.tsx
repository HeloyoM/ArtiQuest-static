import AppList from '../common/list/AppList'
import useArticleQueries from '../article/useArticleQueries'
import { Delete, VisibilityOff } from '@mui/icons-material'
import { IListItem } from '../../interface/IListItem.interface'

type Props = {
    id: string
    active: boolean
}
const ArticleTableItemOptionsList = (props: Props) => {
    const { active, id } = props
    const { handleToggleActive, handleDeleteArticle } = useArticleQueries({})

    const isDisabledArticle = () => {
        return Boolean(active)
    }

    const toggleActiveArticle = () => {
        handleToggleActive.mutate(id)
    }

    const optionsListItems: IListItem[] = [
        { primary: 'delete article', handleClick: () => handleDeleteArticle(id), secondary: '', icon: <Delete /> },
        {
            primary: 'active', handleClick: toggleActiveArticle, secondary: '', icon: <VisibilityOff
                sx={{ color: isDisabledArticle() ? 'black' : 'red', cursor: 'pointer' }} />
        }
    ]

    return (
        <AppList items={optionsListItems} />
    )
}
export default ArticleTableItemOptionsList