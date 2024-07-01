import * as React from 'react'
import '../../artEditor/style.css'
import Box from '@mui/material/Box'
import Menu from '../../artEditor/Menu'
import StepperStages from './StepperStages'
import { isStepOptional, isStepSkipped } from './utils'
import StepperButtons from './StepperButtons'
import { Close } from '@mui/icons-material'
import AppModal from '../modal/AppModal'
import { Button } from '@mui/material'
import langsFile from '../../../utils/system/langs-file.json'
import { useNavigate } from 'react-router-dom'
import clearAllPendingArts from '../../../utils/pendingArtsStorage'

type Props = {
    steps: string[]
    optionals: number[]
}
export default function AppSteper(props: Props) {
    const [steps, setSteps] = React.useState(props.steps)
    const [activeStep, setActiveStep] = React.useState(0)
    const [skipped, setSkipped] = React.useState(new Set<number>())
    const [openModal, setOpenModal] = React.useState(false)

    const { optionals } = props

    const navigate = useNavigate()

    const handleCloseModal = () => {
        setOpenModal(true)

        clearAllPendingArts()
        navigate(-1)
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

    const handleCancelUploading = () => {

    }

    const approvalChanges = (
        <Box sx={modalStyle}>
            {langsFile.system.common.approval}
            <Button onClick={handleCancelUploading}>{langsFile.casual.yes}</Button>
            <Button onClick={handleCloseModal}>{langsFile.casual.no}</Button>
        </Box >
    )

    return (
        <>
            <Box sx={{ width: '100%' }}>

                <Close sx={{
                    position: 'absolute',
                    left: '10%',
                    width: '35px',
                    top: '2%',
                    height: '35px',
                }} onClick={() => setOpenModal(true)} />

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

            <AppModal open={openModal} close={handleCloseModal} children={approvalChanges} />
        </>
    )
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}