import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Article } from '../../interface/article.interface'
import { useNavigate } from 'react-router-dom'

type Props = {
    item: Article
}
const AppCard = (props: Props) => {
    const [expanded, setExpanded] = React.useState(false)

    const navigate = useNavigate()

    const openArticle = () => {
        const title = props.item.title.replace(/\s/g, '-');
        navigate(`/cat/${props.item.cat}/art/${title}/${props.item.id}`)//cat/:category/art/:name/:id
    }

    return (
        <Card sx={{ maxWidth: 345 }} onClick={openArticle}>
            <CardHeader
                // avatar={
                //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                //         R
                //     </Avatar>
                // }
                // action={
                //     <IconButton aria-label="settings">
                //         <MoreVertIcon />
                //     </IconButton>
                // }
                title={props.item.title}
                subheader={new Date(props.item.created).toLocaleDateString()}
            />
            {/* <CardMedia
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Paella dish"
            /> */}

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