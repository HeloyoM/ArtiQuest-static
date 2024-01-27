import { ChangeEvent, useReducer, useState } from 'react'
import AppModal from '../common/modal/AppModal'
import { Box, Typography, Input, FormLabel, FormControl, FormGroup } from '@mui/material'
import { ArrowForward, ArrowBack } from '@mui/icons-material'
import { ActionTypes, FormState, reducer } from './useReducer'
import './style.css'
import { useQuery } from 'react-query'
import { register } from '../../api/user'

const initialState: FormState = {
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
  const [{ email, password, phoneNumber, firstName, lastName }, localDispatch] =
    useReducer(reducer, initialState)
  const [currentStep, setCurrentStep] = useState(0)

  const fieldLabel = [
    { label: 'first_name', field: firstName },
    { label: 'last_name', field: lastName },
    { label: 'email', field: email },
    { label: 'phone_number', field: phoneNumber },
    { label: 'password', field: password }
  ]

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
    console.log({ name, value })
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

    if (name === 'phone_number') {
      localDispatch({ type: ActionTypes.set_phone_number, phoneNumber: value })
    }
  }

  const submit = () => {
    const user = { firstName, lastName, email, phoneNumber, password }

  }

  const loginForm = (
    <Box sx={style}>
      <Typography variant="h6" component="h2" align='center'>
        Login
      </Typography>
      <Typography id="modal-content" sx={{ mt: 2 }} >
        {currentStep > 0 && <ArrowBack onClick={backField} />}
        <FormControl component="fieldset" variant="standard" onSubmit={submit}>
          <FormLabel component="legend">{fieldLabel[currentStep].label}</FormLabel>
          <FormGroup>
            <Input
              onChange={onFormChange}
              name={fieldLabel[currentStep].label}
              value={fieldLabel[currentStep].field}
            />
          </FormGroup>
        </FormControl>
        {currentStep !== fieldLabel.length - 1 ? <ArrowForward onClick={nextField} /> : <button onClick={submit}>Register</button>}
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