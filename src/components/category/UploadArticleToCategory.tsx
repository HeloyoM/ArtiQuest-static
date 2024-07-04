import React from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Typography } from '@mui/material'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import './style.css'

import AppProgress from '../common/AppProgress'
import ErrorFile from './ErrorFile'
import FileLimitations from './FileLimitations'
import useUpload from './useUpload'

import { ICategory } from '../../interface/category.interface'
import useCategoryQueries from './useCategoryQueries'

type Props = {
    category: Partial<ICategory>
}
const UploadArticleToCategory = (props: Props) => {
    const { category } = props

    const { initPendingArticle } = useCategoryQueries({})

    const { error, validateFile } = useUpload()

    const { register, watch } = useForm()

    React.useEffect(() => {
        if (!watch("file").length) return

        const file = watch("file")[0]

        validateFile(file)

        if (!error.fileExtension && !error.fileSizeInMB) {
            const formData = new FormData()
            formData.append("file", file)

            const title = file.name.split('.')[0]!

            formData.append('art', JSON.stringify({ title, cat: category.id }))

            initNewArticle(formData)
        }

    }, [watch("file"), error])

    const initNewArticle = async (formData: FormData) => {
        await initPendingArticle.mutate(formData)
    }

    return (
        <Box sx={{ width: 850 }} role="presentation" >
            <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>{category.name}</Typography>

            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                you about to insert a article to "{category.name}"
            </Typography>

            <React.Fragment>

                <FileLimitations />

                <div className='upload-art'>
                    <form>

                        <Button
                            variant="contained"
                            component="label"
                            className='upload-btn'
                            startIcon={<FileUploadOutlinedIcon />}
                        >
                            <label>
                                upload article
                                <input
                                    multiple
                                    {...register("file")}
                                    type="file"
                                    hidden
                                />
                            </label>

                        </Button>

                    </form>
                </div>

            </React.Fragment>

            <ErrorFile error={error} />

        </Box>
    )
}

export default UploadArticleToCategory