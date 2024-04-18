import * as React from 'react'
import '../../artEditor/style.css'
import Box from '@mui/material/Box'
import Menu from '../../artEditor/Menu'
import StepperStages from './StepperStages'
import { isStepOptional, isStepSkipped } from './utils'
import StepperButtons from './StepperButtons'

type Props = {
    steps: string[]
    optionals: number[]
}
export default function AppSteper(props: Props) {
    const [steps, setSteps] = React.useState(props.steps)
    const [activeStep, setActiveStep] = React.useState(0)
    const [skipped, setSkipped] = React.useState(new Set<number>())

    const { optionals } = props

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
        if (!isStepOptional(props.optionals, activeStep)) {
            throw new Error("You can't skip a step that isn't optional.")
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values())
            newSkipped.add(activeStep)
            return newSkipped
        })
    }

    return (
        <Box sx={{ width: '100%' }}>

            <StepperStages optionals={optionals} activeStep={activeStep} steps={steps} skipped={skipped} />


            <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                <Menu index={activeStep} handleNext={handleNext} endStage={activeStep === steps.length} />

            </Box>

            <StepperButtons
                optionals={optionals}
                activeStep={activeStep}
                handleBack={handleBack}
                handleNext={handleNext}
                handleSkip={handleSkip}
                steps={steps} />

        </Box>
    )
}