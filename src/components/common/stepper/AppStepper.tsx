import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { Close } from '@mui/icons-material'

import './style.css'

import StepperStages from './StepperStages'
import StepperButtons from './StepperButtons'
import AppModal from '../modal/AppModal'

import clearAllPendingArts from '../../../utils/pendingArtsStorage'
import langsFile from '../../../utils/system/langs-file.json'

type Props = {
    steps: string[]
    optionals: number[]
    activeStep: number
    content: JSX.Element
    handleBack: () => void
    handleNext: () => void
    handleSkip: () => void
    skipped: Set<number>
}
export default function AppStepper(props: Props) {

    const [openModal, setOpenModal] = React.useState(false)

    const { optionals, steps, activeStep, skipped, content, handleBack, handleNext, handleSkip } = props

    const navigate = useNavigate()

    const handleCloseModal = () => {
        setOpenModal(true)

        clearAllPendingArts()
        navigate(-1)
    }

    const abrotProcess = () => {

    }

    const approvalChanges = (
        <Box sx={modalStyle}>
            {langsFile.system.editArt.approval}
            <Button onClick={abrotProcess}>{langsFile.casual.yes}</Button>
            <Button onClick={handleCloseModal}>{langsFile.casual.no}</Button>
        </Box >
    )

    return (
        <>
            <Box sx={{ width: '100%' }}>

                <Close className='close' onClick={() => setOpenModal(true)} />

                <StepperStages optionals={optionals} activeStep={activeStep} steps={steps} skipped={skipped} />

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                    {content}

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