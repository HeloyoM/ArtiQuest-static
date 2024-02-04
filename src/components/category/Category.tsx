import React from 'react'
import { useParams } from 'react-router-dom'
import AppProgress from '../common/AppProgress'
import AppCard from '../common/AppCard'
import './style.css'
import { useQuery } from 'react-query'
import { getArticlesByCategoryId } from '../../api/articles'
import { useQueryClient } from '@tanstack/react-query'
import { ICategory } from '../../interface/category.interface'
import { Article } from '../../interface/article.interface'
import AppPagination from '../common/AppPagination'
import { paginate } from '../../utils/paginate'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AppModal from '../common/modal/AppModal'
import { Box, Typography } from '@mui/material'
import AppMenu from '../common/AppMenu'
import UploadArticleToCategory from './UploadArticleToCategory'
import useUpload from './useUpload'
const pageSize = 4

const Category = () => {
    const [page, setPage] = React.useState(1)
    const [articles, setArticles] = React.useState<any[]>([])
    const [insertionOpen, setInsertionOpen] = React.useState(false)

    const openInsertionModal = () => { setInsertionOpen(true) }

    const closeInsertion = () => { setInsertionOpen(false) }

    const { handleArtiFile } = useUpload()

    let { category } = useParams()

    const queryClient = useQueryClient()

    const categoriesData = queryClient.getQueryData(['categories']) as ICategory[]

    const catId = categoriesData.find((c: ICategory) => c.name.trim() === category?.trim())

    const { isLoading, data } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getArticlesByCategoryId(catId?.id!)
    })

    React.useEffect(() => {
        if (!data) return

        setArticles(data)
    }, [data])

    const handlePaginate = (
        e: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(prev => value)
    }

    const insertionModalContent = (
        <Box sx={style}>
            <Typography>Category to insert: {category}</Typography>
        </Box>
    )

    const articlesToDisplay = React.useMemo(() => {
        return paginate(articles, page, pageSize)
    }, [articles, page])

    if (isLoading || !categoriesData) return (<AppProgress />)

    return (
        <>
            <div className='cat'>

                <div>
                    <h2>{category}</h2>

                    <AddCircleOutlineOutlinedIcon onClick={openInsertionModal} />
                </div>

                <div className='cat-actions'>
                    <p>Number of articles: {articles.length}</p>

                </div>

                <div className='cards-container'>
                    {articlesToDisplay.map((a: Article<ICategory>, index: number) => (
                        <AppCard item={a} key={a.id} />
                    ))}
                </div>

                <AppPagination
                    paginate={handlePaginate}
                    page={page}
                    itemsCount={articles.length}
                    pageSize={pageSize} />

            </div>

            <AppMenu menuBody={<UploadArticleToCategory handleUploading={handleArtiFile} category={category} />} openMenu={insertionOpen} close={closeInsertion} category={category} children={insertionModalContent} />

        </>
    )
}

export default Category

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '0px',
    transform: 'translate(-50%, -50%)',
    width: 850,
    height: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}