import { Box, Button } from '@mui/material'
import React from 'react'
import { isStepOptional } from './utils'

type Props = {
    activeStep: number
    steps: string[]
    handleBack: () => void
    handleSkip: () => void
    handleNext: () => void
    optionals: number[]
}
const StepperButtons = (props: Props) => {
    const { activeStep, steps, handleBack, handleSkip, handleNext, optionals } = props

    return (
        <Box className="steps-btns" sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

            <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
            >
                Back
            </Button>

            <Box sx={{ flex: '1 1 auto' }} />

            {isStepOptional(optionals, activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                </Button>
            )}

            <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Preview' : 'Next'}
            </Button>

        </Box>
    )
}

export default StepperButtons