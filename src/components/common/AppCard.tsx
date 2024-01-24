import { Typography, IconButton, CardActions, CardContent, Card, CardHeader } from '@mui/material'
import { Share as ShareIcon, Favorite as FavoriteIcon } from '@mui/icons-material'
import { Article } from '../../interface/article.interface'
import { useNavigate } from 'react-router-dom'

type Props = {
    item: Article
}
const AppCard = (props: Props) => {
    const navigate = useNavigate()

    const openArticle = () => {
        const title = props.item.title.replace(/\s/g, '-')
        navigate(`/cat/${props.item.cat}/art/${title}/${props.item.id}`)
    }

    return (
        <Card sx={{ maxWidth: 345 }} onClick={openArticle}>
            <CardHeader
                title={props.item.title}
                subheader={new Date(props.item.created).toLocaleDateString()}
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
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