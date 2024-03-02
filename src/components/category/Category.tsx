import React from 'react'
import { useParams } from 'react-router-dom'
import AppProgress from '../common/AppProgress'
import AppCard from '../common/AppCard'
import './style.css'
import { Box } from '@mui/material'
import { useQuery } from 'react-query'
import { createArticle, getArticlesByCategoryId } from '../../api/articles'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ICategory } from '../../interface/category.interface'
import { Article } from '../../interface/article.interface'
import AppPagination from '../common/AppPagination'
import { paginate } from '../../utils/paginate'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
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

    const uploadingArti = useMutation({
        mutationFn: (art: Partial<Article>) => createArticle(art),
        mutationKey: ['create-article']
    })

    const insertArticle = (sub_title: string) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.readAsDataURL(selectedDocs!)

            const fileExtension = selectedDocs?.name.split('.')!
            reader.onload = () => {
                const base64 = reader.result

                const art: Partial<Article> = {
                    cat: catId?.id,
                    sub_title,
                    body: base64 as any,
                    title: fileExtension[0]
                }

                resolve(art)
            }
        })
    }

    const handleInsertArticle = async (sub_title: string) => {
        await insertArticle(sub_title)
            .then(res => handleInsertToServer(res))
            .catch((err) => console.log(err))
    }


    const handleInsertToServer = React.useCallback((artData: unknown) => {
        uploadingArti.mutate(artData as Partial<Article>)
    }, [])

    console.log({ articles })
    const handlePaginate = (
        e: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(prev => value)
    }

    const articlesChunk = React.useMemo(() => {
        return paginate(articles, page, pageSize)
    }, [articles, page])

    if (isLoading || !categoriesData) return (<AppProgress />)

    return (
        <React.Fragment>

            <Box className='cat' component='div'>

                <div>
                    <h2>{category}</h2>

                    <AddCircleOutlineOutlinedIcon onClick={openInsertionModal} />
                </div>

                <p>Number of articles: {articles.length}</p>


                <div className='cards-container'>
                    {articlesChunk.map((a: Article<ICategory>) => (
                        <AppCard item={a} key={a.id} />
                    ))}
                </div>

                <AppPagination
                    paginate={handlePaginate}
                    page={page}
                    itemsCount={articles.length}
                    pageSize={pageSize} />
            </Box>

            <AppMenu
                menuBody={<UploadArticleToCategory
                    uploadArticle={handleInsertArticle}
                    selectedDocs={selectedDocs}
                    error={errorWithUpload}
                    isUploading={uploading}
                    handleUploading={handleArtiFile}
                    category={category} />}
                openMenu={insertionOpen}
                close={closeInsertion}
                category={category} />

        </React.Fragment>
    )
}

export default Category