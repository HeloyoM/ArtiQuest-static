import AppStepper from '../common/stepper/AppStepper'
import React from 'react'
import AppProgress from '../common/AppProgress'
import useArticleEditor from './useArticleEditor'
import { Button } from '@mui/material'
import editorSteps from './steps'
import Main from './Main'
import useStepper from '../common/stepper/useStepper'

const ArtEditor = () => {
    const [activeStep, setActiveStep] = React.useState(0)
    const [skipped, setSkipped] = React.useState(new Set<number>())
    const { article } = useArticleEditor({})

    const steps = editorSteps.map(s => s.name)
    const optionalSteps = editorSteps.map(s => (s.optional))

    const optionalsSteps: number[] = []
    for (let i = 0; i < optionalSteps.length; i++) {
        if (optionalSteps[i]) optionalsSteps.push(i)
    }

    const {
        handleBack,
        handleNext,
        handleSkip
    } = useStepper({ optionalsSteps, setSkipped, activeStep, setActiveStep, skipped })

    if (!article) return (<AppProgress />)

    const mainContent = (<Main index={activeStep} endStage={activeStep === steps.length} />)

    return (
        <React.Fragment>

            <AppStepper
                skipped={skipped}
                activeStep={activeStep}
                handleBack={handleBack}
                handleNext={handleNext}
                handleSkip={handleSkip}
                steps={steps}
                optionals={optionalsSteps}
                content={mainContent}
            />

            <Button>Discard</Button>

        </React.Fragment>
    )
}

export default ArtEditor