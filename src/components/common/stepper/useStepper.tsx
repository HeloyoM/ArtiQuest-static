import React from 'react'
import { isStepOptional, isStepSkipped } from './utils'

type Props = {
    skipped: Set<number>
    activeStep: number
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
    setSkipped: React.Dispatch<React.SetStateAction<Set<number>>>
    optionalsSteps: number[]
}
const useStepper = (props: Props) => {
    const { activeStep, skipped, setActiveStep, setSkipped, optionalsSteps } = props

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
        if (!isStepOptional(optionalsSteps, activeStep)) {
            throw new Error("You can't skip a step that isn't optional.")
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values())
            newSkipped.add(activeStep)
            return newSkipped
        })
    }

    return { handleNext, handleBack, handleSkip }
}
export default useStepper