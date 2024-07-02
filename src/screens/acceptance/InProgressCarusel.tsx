import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Paper, Typography } from '@mui/material'

import useArticleQueries from '../../components/article/useArticleQueries'
import TtlTimer from '../../utils/TimerSetter/TtlTimer'

import { StepItem } from './StepItem.interface'
import { User } from '../../interface/user.interface'
import { UpdateTtl } from '../../api/dto/UpdateTtl.dto'
import AppMobileStepper from '../../utils/mobileStepper/AppMobileStepper'

type Props = {
    steps: StepItem[]
}
export default function InProgressCarusel(props: Props) {
    const [activeStep, setActiveStep] = React.useState(0)
    const navigate = useNavigate()

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

    const showAllAuthorArticles = (author: User) => {
        navigate(`/cat/${author.first_name}-${author.last_name}/${author.id}`)
    }

    return (
        <Box>
            <Typography><TtlTimer updateArtTtl={updateArtTtl} ttl={steps[activeStep].ttl!} /></Typography>

            <Box sx={{ maxWidth: 400, flexGrow: 1 }}>

                <Paper
                    square
                    elevation={0}
                    sx={paperStyle}
                >
                    <Typography fontWeight='bold'>{steps[activeStep].label}</Typography>
                </Paper>

                <Box sx={{ maxWidth: 400, width: '100%', p: 2, display: 'grid' }}>

                    <Typography
                        sx={authorRowStyle}
                        onClick={() => showAllAuthorArticles(steps[activeStep].author)}>
                        <span style={{ fontWeight: 'bold' }}>full name:</span> {steps[activeStep].author.first_name + ' ' + steps[activeStep].author.last_name}
                    </Typography>

                    <ParameterRow data={steps[activeStep].author.email} label={'email'} />

                    <ParameterRow data={steps[activeStep].author.phone_number} label={'phone'} />

                    <ParameterRow data={steps[activeStep].author.role} label={'role'} />

                </Box>

                <Box>
                    <Typography><span style={{ fontWeight: 'bold' }}>brief:</span> {steps[activeStep].description}</Typography>
                </Box>

                <AppMobileStepper maxSteps={maxSteps} activeStep={activeStep} setActiveStep={setActiveStep} />
            </Box>
        </Box>
    )
}

type ParamRow = {
    label: string
    data: any
}
const ParameterRow: React.FC<ParamRow> = (props) => {
    return (
        <Typography
            sx={{
                borderRadius: '8px',
                width: '-webkit-fill-available',
                height: 'fit-content',
            }}>
            <span style={{ fontWeight: 'bold' }}>{props.label}:</span>{props.data}</Typography>
    )
}

const authorRowStyle = {
    textDecoration: 'underline',
    cursor: 'pointer',
    borderRadius: '8px',
    width: '-webkit-fill-available',
    height: 'fit-content'
}

const paperStyle = {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    pl: 2,
    bgcolor: 'background.default'
}
