import { Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import './style.css'
import React from 'react';
type Props = {
    children: JSX.Element
    openMenu: boolean
    category?: string
    close: () => void
}

const AppMenu = (props: Props) => {

    const cardsDropdownContainerRef = React.useRef<HTMLDivElement>(null)

    const list = () => (
        <Box
            sx={{ width: 850 }}
            role="presentation"
        >
            <Typography sx={{ textAlign: 'center', fontSize: '22px', fontWeight: 'blod' }}>{props.category}</Typography>

            <Divider />

            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>insert new article to '{props.category}'</Typography>

            <div className='upload-arti'>
                <Button
                    variant="contained"
                    component="label"
                    className='upload-btn'
                    startIcon={<FileUploadOutlinedIcon />}
                >
                    Upload Article
                    <input
                        type="file"
                        hidden
                    />
                </Button>
            </div>

        </Box >
    );

    return (
        <React.Fragment>

            <Drawer
                anchor='left'
                open={props.openMenu}
                onClose={props.close}
            >
                {list()}
            </Drawer>

        </React.Fragment>
    )
}

export default AppMenu