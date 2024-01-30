import { Typography, IconButton, CardActions, CardContent, Card, CardHeader } from '@mui/material'
import { Share as ShareIcon, Favorite as FavoriteIcon } from '@mui/icons-material'
import { Article } from '../../interface/article.interface'
import { useNavigate } from 'react-router-dom'
import { ICategory } from '../../interface/category.interface'

type Props = {
    item: Article<ICategory>
}
const AppCard = (props: Props) => {
    const navigate = useNavigate()

    const openArticle = () => {
        const title = props.item.title.replace(/\s/g, '-')

        navigate(`/cat/${props.item.cat.name}/art/${title}/${props.item.id}`)
    }

    return (
        <Card sx={{ maxWidth: 345 }} onClick={openArticle}>
            <CardHeader
                title={props.item.title}
                subheader={new Date(props.item.created).toLocaleDateString()}
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.item.sub_title}
                </Typography>

                <Typography>
                    {props.item.auther.first_name + ' ' + props.item.auther.last_name}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>

                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>

        </Card>
    )
}

export default AppCard