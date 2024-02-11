import React from 'react'
import './style.css'
import { Box, Button, Divider, Typography } from '@mui/material'
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
}

const UploadArticleToCategory = (props: Props) => {
    const { error, handleUploading, isUploading, category, selectedDocs } = props

    const review = React.useMemo(() => {
        if (!selectedDocs) return

        else return (
            <DocViewer
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

            <FileLimitations />

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

            {review}

            <ErrorFile error={error} />

        </Box>
    )
}

export default UploadArticleToCategory

const pdfConverterURL = 'https://www.youpdf.com/pdf-to-word.html?utm_source=google&utm_medium=CjwKCAiAiP2tBhBXEiwACslfnqzaEbW6d82OCRvNCX2eP7mYPt0b1vOhjnq4IlXlKLjb7ccFUMa0whoCgBsQAvD_BwE&cuid=CjwKCAiAiP2tBhBXEiwACslfnqzaEbW6d82OCRvNCX2eP7mYPt0b1vOhjnq4IlXlKLjb7ccFUMa0whoCgBsQAvD_BwE&gad_source=1&gclid=CjwKCAiAiP2tBhBXEiwACslfnqzaEbW6d82OCRvNCX2eP7mYPt0b1vOhjnq4IlXlKLjb7ccFUMa0whoCgBsQAvD_BwE'