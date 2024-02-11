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
import AppMenu from '../common/AppMenu'
import UploadArticleToCategory from './UploadArticleToCategory'
import useUpload from './useUpload'
import { UploadErrors } from './interface/fileErrors.interface'

const pageSize = 4

const Category = () => {
    const [page, setPage] = React.useState(1)
    const [articles, setArticles] = React.useState<any[]>([])
    const [insertionOpen, setInsertionOpen] = React.useState(false)
    const [uploading, setUploading] = React.useState(false)
    const [selectedDocs, setSelectedDocs] = React.useState<File>()
    const [errorWithUpload, setErrorWithUpload] = React.useState<UploadErrors>({
        fileSizeInMB: false,
        fileExtension: false
    })

    const openInsertionModal = () => { setInsertionOpen(true) }

    const closeInsertion = () => { setInsertionOpen(false) }

    const { handleArtiFile } = useUpload({
        setIsUploading: setUploading,
        setError: setErrorWithUpload,
        setDocxFile: setSelectedDocs
    })

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

                <p>Number of articles: {articles.length}</p>


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

            <AppMenu
                menuBody={<UploadArticleToCategory
                    selectedDocs={selectedDocs}
                    error={errorWithUpload}
                    isUploading={uploading}
                    handleUploading={handleArtiFile}
                    category={category} />}
                openMenu={insertionOpen}
                close={closeInsertion}
                category={category}
            />

        </>
    )
}

export default Category