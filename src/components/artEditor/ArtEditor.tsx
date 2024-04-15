import AppSteper from '../common/AppSteper'
import React from 'react'
import AppProgress from '../common/AppProgress'
import useArticleEditor from './useArticleEditor'
import { Button } from '@mui/material'

const ArtEditor = () => {
    const { article } = useArticleEditor({})

    if (!article) return (<AppProgress />)

    return (
        <React.Fragment>
            <AppSteper article={article} />

            <Button name='discard-changes'>Discard</Button>
        </React.Fragment>
    )
}

export default ArtEditor