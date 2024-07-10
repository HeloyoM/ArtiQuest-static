import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { IconButton } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

import AppTable from '../../common/table/AppTable'
import useCategoryQueries from '../../category/useCategoryQueries'
import { Article } from '../../../interface/article.interface'
import computRows from './rowsDataMapping'
import { authorColumnsDefinition } from './columns-definition'
import { paginate } from '../../../utils/paginate'
import { ICategory } from '../../../interface/category.interface'
import AppProgress from '../../common/AppProgress'
import AppList from '../../common/list/AppList'
import { IListItem } from '../../../interface/IListItem.interface'
import getToalViewers from '../utils/getTotalArticles'
import { Image as ImageIcon, TurnedIn as TurnedIcon, ArticleOutlined } from '@mui/icons-material'
import getPopularArticle from '../utils/getMostPopularArticle'

const AuthorControl = () => {
    const [rows, setRows] = React.useState<any[]>([])
    const [page, setPage] = React.useState(1)

    const navigate = useNavigate()

    let { id } = useParams()

    const { categoryArticles } = useCategoryQueries({ id })
    console.log({ categoryArticles })
    const articlesChunk = React.useMemo(() => {
        if (categoryArticles.data)
            return paginate(categoryArticles.data, page, 1)
    }, [categoryArticles.data, page])

    React.useEffect(() => {
        if (!articlesChunk?.length) return

        const computedRows = articlesChunk.map((r: Article<ICategory>) => {
            const row = computRows(r.title, r.createdAt, r.viewers.length, r.rank.total, r.cat.name, tableOptions(r.id))

            return row
        })

        setRows(computedRows)

    }, [articlesChunk])

    if (!articlesChunk) return <AppProgress />

    const authorName = categoryArticles.data[0].author.first_name + ' ' + categoryArticles.data[0].author.last_name

    const handleAuthorArticles = (id: string) => {
        const artInfo = getArticleInfo(id)

        if (artInfo)
            navigate(`/cat/${artInfo.cat.name}/art/${artInfo.title}/${id}`)
    }

    const getArticleInfo = (id: string) => {
        const art = articlesChunk.find((a: Article) => a.id === id)

        if (art)
            return { title: art.title, cat: { name: art.cat.name, cat_id: art.cat.id } }
    }

    const tableOptions = (id: string) => (
        <IconButton>
            <OpenInNewIcon sx={{ color: 'black', cursor: 'pointer' }} onClick={() => handleAuthorArticles(id)} />
        </IconButton>
    )
    const items: IListItem[] = [
        { primary: 'Total articles', secondary: categoryArticles.data.length, icon: <TurnedIcon /> },
        { primary: 'Viewers', secondary: getToalViewers(articlesChunk), icon: <ImageIcon /> },
        { primary: 'Most popular article', secondary: getPopularArticle(categoryArticles.data), icon: <ArticleOutlined /> },
    ]
    return (
        <React.Fragment>
            <AppTable
                rows={rows}
                columns={authorColumnsDefinition}
                tableTitle={authorName}
                handleUpdateArticle={() => { }}
            />
            <AppList items={items} />
        </React.Fragment>
    )
}

export default AuthorControl