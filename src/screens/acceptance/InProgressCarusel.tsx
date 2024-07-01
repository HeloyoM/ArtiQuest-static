import * as React from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import MobileStepper from '@mui/material/MobileStepper'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { StepItem } from './StepItem.interface'
import { useNavigate } from 'react-router-dom'
import { User } from '../../interface/user.interface'
import TtlTimer from '../../utils/TimerSetter/TtlTimer'
import useArticleQueries from '../../components/article/useArticleQueries'
import { UpdateTtl } from '../../api/dto/UpdateTtl.dto'

type Props = {
    steps: StepItem[]
}
export default function InProgressCarusel(props: Props) {
    const { steps } = props
    const theme = useTheme()
    const [activeStep, setActiveStep] = React.useState(0)
    const maxSteps = steps.length

    const { increaseTtl } = useArticleQueries({})

    const navigate = useNavigate()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const updateArtTtl = (ttl: number) => {
        const payload: UpdateTtl = {
            author_id: steps[activeStep].author.id,
            id: steps[activeStep].id,
            ttl
        }

        increaseTtl.mutate(payload)
    }


    const showAllAutherArticles = (author: User) => {
        navigate(`/cat/${author.first_name}-${author.last_name}/${author.id}`)
    }

    return (
        <Box>
            <Typography><TtlTimer updateArtTtl={updateArtTtl} ttl={steps[activeStep].ttl!} /></Typography>

            <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                <Paper
                    square
                    elevation={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 50,
                        pl: 2,

                        bgcolor: 'background.default',
                    }}
                >
                    <Typography fontWeight='bold'>{steps[activeStep].label}</Typography>
                </Paper>

                <Box sx={{ maxWidth: 400, width: '100%', p: 2, display: 'grid' }}>

                    <Typography sx={{ textDecoration: 'underline', cursor: 'pointer', borderRadius: '8px', width: '-webkit-fill-available', height: 'fit-content' }} onClick={() => showAllAutherArticles(steps[activeStep].author)}>
                        <span style={{ fontWeight: 'bold' }}>full name:</span> {steps[activeStep].author.first_name + ' ' + steps[activeStep].author.last_name}
                    </Typography>

                    <Typography sx={{
                        borderRadius: '8px',
                        width: '-webkit-fill-available',
                        height: 'fit-content',
                    }} ><span style={{ fontWeight: 'bold' }}>email:</span>{steps[activeStep].author.email}</Typography>
                    <Typography sx={{
                        borderRadius: '8px',
                        width: '-webkit-fill-available',
                        height: 'fit-content',
                    }}  ><span style={{ fontWeight: 'bold' }}>phone:</span> {steps[activeStep].author.phone_number}</Typography>
                    <Typography sx={{
                        borderRadius: '8px',
                        width: '-webkit-fill-available',
                        height: 'fit-content',
                    }}  ><span style={{ fontWeight: 'bold' }}>role:</span>{steps[activeStep].author.role}</Typography>

                </Box>

                <Box>
                    <Typography><span style={{ fontWeight: 'bold' }}>brief:</span> {steps[activeStep].description}</Typography>
                </Box>

                <MobileStepper
                    variant="text"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Box>
        </Box>
    )
}
