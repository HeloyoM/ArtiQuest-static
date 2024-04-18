import AppSteper from '../common/AppStepper/AppSteper'
import React from 'react'
import AppProgress from '../common/AppProgress'
import useArticleEditor from './useArticleEditor'
import { Button } from '@mui/material'

const ArtEditor = () => {
    const { article } = useArticleEditor({})

    if (!article) return (<AppProgress />)

    const stepsInfo = [{ name: 'Title', optional: false }, { name: 'Sub title', optional: true }, { name: 'Article body', optional: false }]
    const steps = stepsInfo.map(s => s.name)
    const optionalSteps = stepsInfo.map(s => (s.optional))
    
    const optionals = []
    for (let i = 0; i < optionalSteps.length; i++) {
        if (optionalSteps[i]) optionals.push(i)
    }
    return (
        <React.Fragment>
            <AppSteper article={article} steps={steps} optionals={optionals} />

            <Button name='discard-changes'>Discard</Button>
        </React.Fragment>
    )
}

export default ArtEditor