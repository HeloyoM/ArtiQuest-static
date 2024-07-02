import { Button } from "@mui/material"
import { useTheme } from '@mui/material/styles'

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

type BtnProps = {
    handleNavigate: () => void
    activeStep?: number | undefined
    label: "next" | "back"
    maxSteps: number
}
export const StepperButton = (props: BtnProps) => {
    const { handleNavigate, activeStep, label, maxSteps } = props
    const theme = useTheme()
    const isNextButton = label === "next"
    return (
        <Button
            size="small"
            onClick={handleNavigate}
            disabled={isNextButton ? activeStep === maxSteps - 1 : activeStep === 0}>

            {theme.direction === 'rtl' ? (
                !isNextButton ? <KeyboardArrowRight /> : <KeyboardArrowLeft />
            ) : (
                isNextButton ? <KeyboardArrowRight /> : <KeyboardArrowLeft />
            )}
            {label}

        </Button>
    )
}

export default StepperButton