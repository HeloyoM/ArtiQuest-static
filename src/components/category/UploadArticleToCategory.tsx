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

type Props = {
    category?: string
    handleUploading: (e: React.ChangeEvent<HTMLInputElement>) => void
    isUploading: boolean
    error: UploadErrors
    uploadArticle: (sub_title: string, title: string, file: FormData) => void
}

const UploadArticleToCategory = (props: Props) => {
    const [file, setFile] = React.useState<File>()
    const [sub_title, setSubTitle] = React.useState('')
    const { error, handleUploading, isUploading, category, uploadArticle } = props

    const { register, handleSubmit } = useForm();

    const handleSubtitle = (
        { target }: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSubTitle(target.value)
    }

    const onSubmit = async (data: any) => {
        const formData = new FormData()
        formData.append("file", data.file[0])
        console.log(Object.fromEntries(formData))
        const title = file?.name.split('.')[0]!
        
        formData.append('sub_title', sub_title);
        formData.append('title', title);
        uploadArticle(sub_title, title, formData)
    }

    return (
        <Box sx={{ width: 850 }} role="presentation" >
            <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>{category}</Typography>

            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                you head to insert a article to "{category}"
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

                <FileReviewer file={file} />


            </React.Fragment>


            {/* <ErrorFile error={error} /> */}

        </Box>
    )
}

export default UploadArticleToCategory