import React from 'react'
import './style.css'
import { Box, Button, Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import AppProgress from '../common/AppProgress'
import { UploadErrors } from './interface/fileErrors.interface'

type Props = {
    category?: string
    handleUploading: (e: React.ChangeEvent<HTMLInputElement>) => void
    isUploading: boolean
    error: UploadErrors
}

const UploadArticleToCategory = (props: Props) => {
    const occueredError = Object.values(props.error)

    return (
        <Box
            sx={{ width: 850 }}
            role="presentation"
        >
            <Typography sx={{ textAlign: 'center', fontSize: '22px', fontWeight: 'blod' }}>{props.category}</Typography>

            <Divider />

            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>insert new article to '{props.category}'</Typography>

            <Typography sx={{ textAlign: 'center', fontWeight: 'bold', margin: '5% 0px' }}>
                Here you can upload articles that stored in .docx files, in the future we'll enable to
                upload more type of articles there. If you want to upload an pdf or any other file please convert
                it to .docx using this free tool {' '}
                <a href="https://www.youpdf.com/pdf-to-word.html?utm_source=google&utm_medium=CjwKCAiAiP2tBhBXEiwACslfnqzaEbW6d82OCRvNCX2eP7mYPt0b1vOhjnq4IlXlKLjb7ccFUMa0whoCgBsQAvD_BwE&cuid=CjwKCAiAiP2tBhBXEiwACslfnqzaEbW6d82OCRvNCX2eP7mYPt0b1vOhjnq4IlXlKLjb7ccFUMa0whoCgBsQAvD_BwE&gad_source=1&gclid=CjwKCAiAiP2tBhBXEiwACslfnqzaEbW6d82OCRvNCX2eP7mYPt0b1vOhjnq4IlXlKLjb7ccFUMa0whoCgBsQAvD_BwE">pdf converter</a>
                {' '}after converting you will can upload the article.
            </Typography>

            <Typography sx={{ textAlign: 'left', fontWeight: 'bold', margin: '5% 10%' }}>thank you.</Typography>

            <List sx={{ textAlign: 'left', fontWeight: 'bold', margin: '5% 5%' }}>
                limitations:
                <ListItem>
                    limit:
                    <ListItemText primary={' 1MB file size'} />
                </ListItem>
                <ListItem>
                    type:
                    <ListItemText primary={' as we agree before, yet just .docx files '} />
                </ListItem>
            </List>

            <div className='upload-arti'>
                <Button
                    variant="contained"
                    component="label"
                    className='upload-btn'
                    startIcon={<FileUploadOutlinedIcon />}
                >
                    {!props.isUploading ?
                        <label>
                            'Upload Article'
                            <input
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.handleUploading(e)}
                                type="file"
                                hidden
                            />
                        </label>
                        : <AppProgress type='Circular' />
                    }
                </Button>
            </div>

            {occueredError.includes(true) && <Typography className='error-upload' component='div'>
                <List>
                    <ListItem >{props.error.fileSizeInMB && 'file is too big'}</ListItem>
                    <ListItem >{props.error.fileExtension && 'type of file is not allowed yet'}</ListItem>
                </List>

            </Typography>}
        </Box >
    )
}

export default UploadArticleToCategory