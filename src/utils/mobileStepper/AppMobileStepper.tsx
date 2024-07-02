import React from 'react'
import { MobileStepper } from '@mui/material'

import StepperButton from './StepperButton'

type Props = {
    maxSteps: number
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
    activeStep?: number | undefined
}
const AppMobileStepper = (props: Props) => {
    const { maxSteps, setActiveStep, activeStep } = props


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
    return (
        <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
                <StepperButton
                    maxSteps={maxSteps}
                    activeStep={activeStep}
                    handleNavigate={handleNext}
                    label="next" />
            }

            backButton={
                <StepperButton
                    maxSteps={maxSteps}
                    activeStep={activeStep}
                    handleNavigate={handleBack}
                    label="back" />
            }
        />
    )
}
export default AppMobileStepper