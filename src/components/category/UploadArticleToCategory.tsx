import React from 'react'
import './style.css'
import { Box, Button, FormControl, Input, InputLabel, Typography } from '@mui/material'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import AppProgress from '../common/AppProgress'
import { UploadErrors } from './interface/fileErrors.interface'

import ErrorFile from './ErrorFile'
import FileLimitations from './FileLimitations'
import { useForm } from 'react-hook-form'
import FileReviewer from '../common/FileReviewer'
import { ICategory } from '../../interface/category.interface'

type Props = {
    category: Partial<ICategory>
    isUploading: boolean
    error: UploadErrors
    uploadArticle: (file: FormData) => void
}

const UploadArticleToCategory = (props: Props) => {

    const [sub_title, setSubTitle] = React.useState('')
    const { error, isUploading, category, uploadArticle } = props

    const { register, handleSubmit } = useForm()

    const handleSubtitle = (
        { target }: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSubTitle(target.value)
    }

    const onSubmit = async (data: any) => {
        const formData = new FormData()
        formData.append("file", data.file[0])
        const title = data.file[0].name.split('.')[0]!

        formData.append('art', JSON.stringify({ title, sub_title, cat: category.id }))
        uploadArticle(formData)
    }

    return (
        <Box sx={{ width: 850 }} role="presentation" >
            <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>{category.name}</Typography>

            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                you head to insert a article to "{category.name}"
            </Typography>

            <React.Fragment>

                <FileLimitations />

                <div className='upload-arti'>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <Button
                            variant='contained'
                            color='secondary'
                            sx={{ width: '100%', height: '47px' }}
                            type="submit">Upload</Button>

                        <Button
                            variant="contained"
                            component="label"
                            className='upload-btn'
                            startIcon={!isUploading ? <FileUploadOutlinedIcon /> : <AppProgress type='Circular' />}
                        >
                            <label>
                                upload article
                                <input
                                    multiple {...register("file")}
                                    type="file"
                                    hidden
                                />
                            </label>

                        </Button>

                    </form>
                </div>

            </React.Fragment>

            <React.Fragment>


                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="component-simple">sub title(recomended)</InputLabel>
                        <Input id="component-simple" name='sub_title' onChange={handleSubtitle} />
                    </FormControl>
                </Box>

                {/* <FileReviewer file={file} /> */}


            </React.Fragment>


            {/* <ErrorFile error={error} /> */}

        </Box>
    )
}

export default UploadArticleToCategory