import { Typography, Card, CardHeader } from '@mui/material'
import { Article } from '../../interface/article.interface'
import { useNavigate } from 'react-router-dom'
import { ICategory } from '../../interface/category.interface'

type Props = {
    item: Article<ICategory>
    handleSaveLastPage?: () => void
    categoryName: string
    color: string
}
const AppCard = (props: Props) => {
    const navigate = useNavigate()

    const { author } = props.item

    const openArticle = () => {
        const title = props.item.title.replace(/\s/g, '-')

        props.handleSaveLastPage!()

        navigate(`/cat/${props.categoryName}/art/${title}/${props.item.id}`)
    }

    const shadow = `0px 7px 1px -1px rgba(0,0,0,0.2),0px 7px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)`

    return (
        <Card sx={{ width: '100%', border: `1px solid ${props.color}`, boxShadow: shadow }} >
            <CardHeader
                sx={{ textAlign: 'center' }}
                onClick={openArticle}
                title={props.item.title}
                subheader={
                    <Typography>
                        {/* {new Date(props.item.createdAt).toLocaleDateString()} {' '} */}
                        {author.first_name + ' ' + author.last_name}
                    </Typography>
                }
            />
        </Card>
    )
}

export default AppCard