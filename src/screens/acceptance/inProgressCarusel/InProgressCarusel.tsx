import * as React from 'react'

import { Box, Paper, Typography } from '@mui/material'
import './style.css'
import useArticleQueries from '../../../components/article/useArticleQueries'
import TtlTimer from '../../../utils/TimerSetter/TtlTimer'
import { StepItem } from '../StepItem.interface'

import { UpdateTtl } from '../../../api/dto/UpdateTtl.dto'
import AppMobileStepper from '../../../utils/mobileStepper/AppMobileStepper'
import PendingArtAuthorInfo from './PendingArtAuthorInfo'

type Props = {
    steps: StepItem[]
}
export default function InProgressCarusel(props: Props) {
    const [activeStep, setActiveStep] = React.useState(0)

    const { steps } = props
    const maxSteps = steps.length

    const { increaseTtl } = useArticleQueries({})

    const updateArtTtl = (ttl: number) => {
        const payload: UpdateTtl = {
            author_id: steps[activeStep].author.id,
            id: steps[activeStep].id,
            ttl
        }

        increaseTtl.mutate(payload)
    }

    const baseClass = 'pending-art-'
    return (
        <Box>
            <Typography><TtlTimer updateArtTtl={updateArtTtl} ttl={steps[activeStep].ttl!} /></Typography>

            <Box sx={{ maxWidth: 400, flexGrow: 1 }}>

                <Paper
                    square
                    elevation={0}
                    className={`${baseClass}title`}
                >
                    <Typography fontWeight='bold'>{steps[activeStep].label}</Typography>
                </Paper>

                <PendingArtAuthorInfo author={steps[activeStep].author} />

                <Typography>
                    <span style={{ fontWeight: 'bold' }}>brief:</span>{steps[activeStep].description}
                </Typography>

                <AppMobileStepper maxSteps={maxSteps} activeStep={activeStep} setActiveStep={setActiveStep} />
            </Box>
        </Box>
    )
}