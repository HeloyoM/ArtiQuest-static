import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import React from 'react'
import { isStepOptional } from './utils'

type Props = {
    activeStep: number
    steps: string[]
    skipped: Set<number>
    optionals: number[]
}
const StepperStages = (props: Props) => {
    const { activeStep, steps, skipped } = props

    const isStepSkipped = (step: number) => {
        return skipped.has(step)
    }

    return (
        <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {}

                const labelProps: {
                    optional?: React.ReactNode
                } = {}

                if (isStepOptional(props.optionals,index)) {
                    labelProps.optional = (
                        <Typography variant="caption">Optional</Typography>
                    )
                }

                if (isStepSkipped(index)) {
                    stepProps.completed = false
                }

                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                )
            })}
        </Stepper>
    )
}

export default StepperStages