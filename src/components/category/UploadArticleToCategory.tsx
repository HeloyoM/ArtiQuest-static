import React from 'react'
import './style.css'
import { Box, Button, Divider, FormControl, Input, InputLabel, Typography } from '@mui/material'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import AppProgress from '../common/AppProgress'
import { UploadErrors } from './interface/fileErrors.interface'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import ErrorFile from './ErrorFile'
import FileLimitations from './FileLimitations'

type Props = {
    category?: string
    handleUploading: (e: React.ChangeEvent<HTMLInputElement>) => void
    isUploading: boolean
    error: UploadErrors
    selectedDocs?: File
    uploadArticle: (sub_title: string) => void
}

const UploadArticleToCategory = (props: Props) => {
    const [sub_title, setSubTitle] = React.useState('')
    const { error, handleUploading, isUploading, category, selectedDocs, uploadArticle } = props

    const handleSubtitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubTitle(e.target.value)
    }

    const review = React.useMemo(() => {
        if (!selectedDocs) return

        else return (
            <DocViewer
                config={{ header: { disableFileName: true } }}
                documents={[{ uri: URL.createObjectURL(selectedDocs) }]}
                pluginRenderers={DocViewerRenderers}
            />
        )
    }, [selectedDocs])

    return (
        <Box sx={{ width: 850 }} role="presentation" >
            <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>{category}</Typography>

            <Divider />

            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>insert new article to '{category}'</Typography>

            <Typography sx={{ textAlign: 'center', fontWeight: 'bold', margin: '5% 0px' }}>
                Here you can upload articles that stored in .docx files, in the future we'll enable to
                upload more type of articles there. If you want to upload an pdf or any other file please convert
                it to .docx using this free tool {' '}
                <a href={pdfConverterURL}>pdf converter</a>
                {' '}after converting you will can upload the article.
            </Typography>

            <Typography sx={{ textAlign: 'left', fontWeight: 'bold', margin: '5% 10%' }}>thank you.</Typography>

            {!review && <React.Fragment> <FileLimitations />

                <div className='upload-arti'>
                    <Button
                        variant="contained"
                        component="label"
                        className='upload-btn'
                        startIcon={<FileUploadOutlinedIcon />}
                    >
                        {!isUploading ?
                            <label>
                                'Upload Article'
                                <input
                                    multiple
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUploading(e)}
                                    type="file"
                                    hidden
                                />
                            </label>
                            : <AppProgress type='Circular' />
                        }
                    </Button>

                </div>
            </React.Fragment>}

            {review &&
                <React.Fragment>
                    <Button
                        variant='contained'
                        color='secondary'
                        sx={{ width: '100%', height: '47px' }}
                        onClick={() => uploadArticle(sub_title)}>Upload</Button>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="component-simple">sub title(recomended)</InputLabel>
                            <Input id="component-simple" name='sub_title' onChange={handleSubtitle} />
                        </FormControl>
                    </Box>
                    {review}


                </React.Fragment>

            }
            {/* <ErrorFile error={error} /> */}

        </Box>
    )
}

export default UploadArticleToCategory

const pdfConverterURL = 'https://www.youpdf.com/pdf-to-word.html?utm_source=google&utm_medium=CjwKCAiAiP2tBhBXEiwACslfnqzaEbW6d82OCRvNCX2eP7mYPt0b1vOhjnq4IlXlKLjb7ccFUMa0whoCgBsQAvD_BwE&cuid=CjwKCAiAiP2tBhBXEiwACslfnqzaEbW6d82OCRvNCX2eP7mYPt0b1vOhjnq4IlXlKLjb7ccFUMa0whoCgBsQAvD_BwE&gad_source=1&gclid=CjwKCAiAiP2tBhBXEiwACslfnqzaEbW6d82OCRvNCX2eP7mYPt0b1vOhjnq4IlXlKLjb7ccFUMa0whoCgBsQAvD_BwE'