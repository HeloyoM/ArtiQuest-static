import { useState } from 'react'
import AppModal from '../common/modal/AppModal'
import { Box, Typography, Input, FormLabel, FormControl, FormGroup, FormControlLabel, Switch, FormHelperText } from '@mui/material'
import { ArrowForward, ArrowBack } from '@mui/icons-material'
import './style.css'

type Props = {
  openLogin: boolean
  closeLoginModal: () => void
}

const Login = (props: Props) => {
  const [fieldLabel, setFieldLabel] = useState(['First name', 'Last name', 'email', 'phone number', 'password'])
  const [currentStep, setCurrentStep] = useState(0)

  const nextField = () => {
    if (currentStep + 1 >= fieldLabel.length) return

    else setCurrentStep(prev => prev + 1)
  }

  const backField = () => {
    if (currentStep == 0) return

    else setCurrentStep(prev => prev - 1)
  }

  const loginForm = (
    <Box sx={style}>
      <Typography variant="h6" component="h2" align='center'>
        Login
      </Typography>
      <Typography id="modal-content" sx={{ mt: 2 }} >
        {currentStep > 0 && <ArrowBack onClick={backField} />}
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">{fieldLabel[currentStep]}</FormLabel>
          <FormGroup>
            <Input />
          </FormGroup>
        </FormControl>
        {currentStep !== fieldLabel.length - 1 && <ArrowForward onClick={nextField} />}
      </Typography>
    </Box>
  )

  return (
    <div>
      <AppModal popupModal open={props.openLogin} close={props.closeLoginModal} >
        {loginForm}
      </AppModal>
    </div>
  )
}

export default Login

const style = {
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