import AppSteper from '../common/AppStepper/AppSteper'
import React from 'react'
import AppProgress from '../common/AppProgress'
import useArticleEditor from './useArticleEditor'
import { Button } from '@mui/material'
import editorSteps from './steps'

const ArtEditor = () => {
    const { article } = useArticleEditor({})

    if (!article) return (<AppProgress />)

    const steps = editorSteps.map(s => s.name)
    const optionalSteps = editorSteps.map(s => (s.optional))

    const optionals = []
    for (let i = 0; i < optionalSteps.length; i++) {
        if (optionalSteps[i]) optionals.push(i)
    }

    return (
        <React.Fragment>
            <AppSteper steps={steps} optionals={optionals} />

            <Button name='discard-changes'>Discard</Button>
        </React.Fragment>
    )
}

export default ArtEditor