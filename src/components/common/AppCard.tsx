import { Typography, IconButton, CardActions, CardContent, Card, CardHeader } from '@mui/material'
import { Share as ShareIcon, Favorite as FavoriteIcon } from '@mui/icons-material'
import { Article } from '../../interface/article.interface'
import { useNavigate } from 'react-router-dom'
import { ICategory } from '../../interface/category.interface'
import { useContext } from 'react'
import { AppParticipantsContext } from '../../contextes/participantsContext'

type Props = {
    item: Article<ICategory>
}
const AppCard = (props: Props) => {
    const navigate = useNavigate()

    const { switchParticipant } = useContext(AppParticipantsContext)
    const openArticle = () => {
        const title = props.item.title.replace(/\s/g, '-')

        navigate(`/cat/${props.item.cat.name}/art/${title}/${props.item.id}`)
    }

    const showParticipant = () => { switchParticipant(props.item.author.id!) }

    return (
        <Card sx={{ maxWidth: 345 }} >
            <CardHeader
                onClick={openArticle}
                title={props.item.title}
                subheader={new Date(props.item.created).toLocaleDateString()}
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.item.sub_title}
                </Typography>

                <Typography sx={{ textDecoration: 'underline' }} onClick={showParticipant}>
                    by: {props.item.author.first_name + ' ' + props.item.author.last_name}
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