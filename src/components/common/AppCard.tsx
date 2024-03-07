import { Typography, Card, CardHeader } from '@mui/material'
import { Article } from '../../interface/article.interface'
import { useNavigate } from 'react-router-dom'
import { ICategory } from '../../interface/category.interface'

type Props = {
    item: Article<ICategory>
    handleSaveLastPage: () => void
}
const AppCard = (props: Props) => {
    const navigate = useNavigate()

    const { author } = props.item

    const openArticle = () => {
        const title = props.item.title.replace(/\s/g, '-')

        props.handleSaveLastPage()

        navigate(`/cat/${props.item.cat.name}/art/${title}/${props.item.id}`)
    }

    return (
        <Card sx={{ maxWidth: 345 }} >
            <CardHeader
                onClick={openArticle}
                title={props.item.title}
                subheader={
                    <Typography>
                        {new Date(props.item.created).toLocaleDateString()} {' '}
                        {author.first_name + ' ' + author.last_name}
                    </Typography>
                }
            />
        </Card>
    )
}

export default AppCard