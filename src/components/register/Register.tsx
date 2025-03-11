import React, { useState } from 'react'
import { ArrowForward, ArrowBack } from '@mui/icons-material'
import './style.css'

import AppModal from '../common/modal/AppModal'
import { Box, Typography, Input, FormLabel, FormControl, FormGroup, Button, Checkbox, FormControlLabel } from '@mui/material'
import useQueries from './useQueries'
import AppUserContext from '../../contextes/AppUserContext'
import useUserForm from '../common/form/useUserForm'

type Props = {
  openRegisterForm: boolean
  closeRegisterModal: () => void
  onLogin: () => void
}

const RegisterForm = (props: Props) => {
  const [isLoginForm, setIsLoginFrom] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked)
  }

  const [currentStep, setCurrentStep] = React.useState(0)

  const { user } = React.useContext(AppUserContext)

  const { onFormChange, email, password, phone_number, firstName, lastName } = useUserForm()

  const {
    loginMutate,
    registerMutate,
    handleLogout
  } = useQueries({ onLogin: props.onLogin, closeRegisterModal: props.closeRegisterModal })

  const fieldLabel = [
    { label: 'first_name', field: firstName },
    { label: 'last_name', field: lastName },
    { label: 'phone_number', field: phone_number },
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


  const submitForm = () => {
    if (!isLoginForm) {
      const user = { first_name: firstName, last_name: lastName, email, phone_number, password }
      registerMutate.mutate(user)


    } else {
      const payload = { username: email, password, rememberUser: rememberMe }

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

      {currentStep === fieldLabel.length - 1 && isLoginForm ? <FormControlLabel
        control={
          <Checkbox checked={rememberMe} onChange={handleChange} name="remember-me" />
        }
        label="remember me for other connections"
      /> : <></>}

    </Box>
  )

  const logoutViewing = (
    <Box sx={style}>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  )

  return (
    <div>
      <AppModal popupModal open={props.openRegisterForm} close={props.closeRegisterModal} >
        {!Boolean(user) ? RegisterForm : logoutViewing}
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
  width: '20rem',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}