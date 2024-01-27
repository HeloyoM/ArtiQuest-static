import { ChangeEvent, useReducer, useState } from 'react'
import AppModal from '../common/modal/AppModal'
import { Box, Typography, Input, FormLabel, FormControl, FormGroup } from '@mui/material'
import { ArrowForward, ArrowBack } from '@mui/icons-material'
import { ActionTypes, FormState, reducer } from './useReducer'
import './style.css'

const initialState: FormState = {
  type: null,
  email: '',
  password: '',
  phoneNumber: '',
  firstName: '',
  lastName: ''
}

type Props = {
  openLogin: boolean
  closeLoginModal: () => void
}

const Login = (props: Props) => {
  const [{ type, email, password, phoneNumber, firstName, lastName }, localDispatch] =
    useReducer(reducer, initialState)
  const [currentStep, setCurrentStep] = useState(0)

  const fieldLabel = ['first_name', 'last_name', 'email', 'phone_number', 'password']
  const nextField = () => {
    if (currentStep + 1 >= fieldLabel.length) return

    else setCurrentStep(prev => prev + 1)
  }

  const backField = () => {
    if (currentStep == 0) return

    else setCurrentStep(prev => prev - 1)
  }

  const onFormChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    console.log({ name })
    if (name === 'email') {
      localDispatch({ type: ActionTypes.set_email, email: value })
    }
    if (name === 'password') {
      localDispatch({ type: ActionTypes.set_password, password: value })
    }

    if (name === 'first_name') {
      localDispatch({ type: ActionTypes.set_first_name, firstName: value })
    }

    if (name === 'last_name') {
      localDispatch({ type: ActionTypes.set_last_name, lastName: value })
    }
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
            <Input onChange={onFormChange} name={fieldLabel[currentStep]} />
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