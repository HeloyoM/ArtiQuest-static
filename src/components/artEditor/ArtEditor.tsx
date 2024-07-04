import AppStepper from '../common/AppStepper/AppStepper'
import React from 'react'
import AppProgress from '../common/AppProgress'
import useArticleEditor from './useArticleEditor'
import { Button } from '@mui/material'
import editorSteps from './steps'
import { isStepOptional, isStepSkipped } from '../common/AppStepper/utils'
import Main from './Main'

const ArtEditor = () => {
    const [activeStep, setActiveStep] = React.useState(0)
    const [skipped, setSkipped] = React.useState(new Set<number>())
    const { article } = useArticleEditor({})

    if (!article) return (<AppProgress />)

    const steps = editorSteps.map(s => s.name)
    const optionalSteps = editorSteps.map(s => (s.optional))

    const optionals: any[] = []
    for (let i = 0; i < optionalSteps.length; i++) {
        if (optionalSteps[i]) optionals.push(i)
    }

    const handleNext = () => {
        let newSkipped = skipped
        if (isStepSkipped(skipped, activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped(newSkipped)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleSkip = () => {
        if (!isStepOptional(optionals, activeStep)) {
            throw new Error("You can't skip a step that isn't optional.")
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values())
            newSkipped.add(activeStep)
            return newSkipped
        })
    }

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
                optionals={optionals}
                content={mainContent}
            />

            <Button name='discard-changes'>Discard</Button>

        </React.Fragment>
    )
}

export default ArtEditor