import { ChangeEvent, useReducer, useState } from 'react'
import AppModal from '../common/modal/AppModal'
import { Box, Typography, Input, FormLabel, FormControl, FormGroup, Button } from '@mui/material'
import { ArrowForward, ArrowBack } from '@mui/icons-material'
import { FormState, reducer } from './useReducer'
import { FormFields } from './form.enum'
import useQueries from './useQueries'
import './style.css'

const initialState: FormState = {
  email: '',
  password: '',
  phoneNumber: '',
  firstName: '',
  lastName: ''
}

type Props = {
  openRegisterForm: boolean
  closeRegisterModal: () => void
  onLogin: () => void
}

const RegisterForm = (props: Props) => {
  const [isLoginForm, setIsLoginFrom] = useState(false)
  const [{ email, password, phoneNumber, firstName, lastName }, localDispatch] =
    useReducer(reducer, initialState)
  const [currentStep, setCurrentStep] = useState(0)

  const { loginMutate, registerMutate } = useQueries({ onLogin: props.onLogin })

  const fieldLabel = [
    { label: 'first_name', field: firstName },
    { label: 'last_name', field: lastName },
    { label: 'phone_number', field: phoneNumber },
    { label: 'email', field: email },
    { label: 'password', field: password },
  ]

  const updateCurrentStep = (value: number) => {
    setCurrentStep(value)
  }

  const nextField = () => {
    if (currentStep + 1 >= fieldLabel.length) return

    else updateCurrentStep(currentStep + 1)
  }

  const backField = () => {
    if (currentStep == 0) return

    else updateCurrentStep(currentStep - 1)
  }

  const onFormChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {

    if (name === 'email') {
      localDispatch({ type: FormFields.set_email, email: value })
    }

    if (name === 'password') {
      localDispatch({ type: FormFields.set_password, password: value })
    }

    if (name === 'first_name') {
      localDispatch({ type: FormFields.set_first_name, firstName: value })
    }

    if (name === 'last_name') {
      localDispatch({ type: FormFields.set_last_name, lastName: value })
    }

    if (name === 'phone_number') {
      localDispatch({ type: FormFields.set_phone_number, phoneNumber: value })
    }

  }

  const submitForm = () => {
    if (!isLoginForm) {
      const user = { firstName, lastName, email, phoneNumber, password }
      registerMutate.mutate(user)


    } else {
      const payload = { email, password }

      loginMutate.mutate(payload)
    }

    props.closeRegisterModal()
  }

  const handleLoginForm = () => {
    setIsLoginFrom(prev => true)

    updateCurrentStep(3)
  }

  const backRegister = () => {
    setIsLoginFrom(prev => false)

    updateCurrentStep(0)
  }

  const RegisterForm = (
    <Box sx={style}>

      <Typography variant="h6" component="h2" align='center'>
        {!isLoginForm ? 'Register' : 'Login'}
      </Typography>

      <Typography align='center'>
        {!isLoginForm
          ? <Button onClick={handleLoginForm}>Allready have aacount? </Button>
          : <Button onClick={backRegister}>back register </Button>}
      </Typography>

      <Typography id="modal-content" sx={{ mt: 2 }} >

        {
          currentStep > 0 && !isLoginForm ||
          currentStep == fieldLabel.length - 1 && isLoginForm
          && <ArrowBack onClick={backField} />
        }

        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">{fieldLabel[currentStep].label}</FormLabel>
          <FormGroup>
            <Input
              autoFocus
              onChange={onFormChange}
              name={fieldLabel[currentStep].label}
              value={fieldLabel[currentStep].field}
            />
          </FormGroup>
        </FormControl>

        {currentStep !== fieldLabel.length - 1
          ? <ArrowForward onClick={nextField} />
          : <Button onClick={submitForm}>{isLoginForm ? 'Login' : 'Register'}</Button>
        }

      </Typography>

    </Box>
  )

  return (
    <div>
      <AppModal popupModal open={props.openRegisterForm} close={props.closeRegisterModal} >
        {RegisterForm}
      </AppModal>
    </div>
  )
}

export default RegisterForm

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