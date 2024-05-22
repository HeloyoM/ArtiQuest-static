import AppList from '../common/list/AppList'
import useArticleQueries from '../article/useArticleQueries'
import { Article } from '../../interface/article.interface'
import { Delete, VisibilityOff } from '@mui/icons-material'
import { IListItem } from '../../interface/IListItem.interface'

type Props = {
    id: string
}
const ItemOptionsList = (props: Props) => {

    const { handleToggleActive } = useArticleQueries({})

    const isDisabledArticle = () => {
        return true//Boolean(categoriesChunk[0].arts.find((a: Article) => (a.id === props.id)).active)
    }

    const toggleActiveArticle = () => {
        handleToggleActive.mutate(props.id)
    }

    const optionsListItems: IListItem[] = [
        { primary: 'delete article', handleClick: () => { }, secondary: '', icon: <Delete /> },
        {
            primary: 'active', handleClick: toggleActiveArticle, secondary: '', icon: <VisibilityOff
                sx={{ color: isDisabledArticle() ? 'black' : 'red', cursor: 'pointer' }} />
        }
    ]

    return (
        <AppList items={optionsListItems} />
    )
}
export default ItemOptionsList