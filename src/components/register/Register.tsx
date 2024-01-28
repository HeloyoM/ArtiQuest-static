import { ChangeEvent, useReducer, useState } from 'react'
import AppModal from '../common/modal/AppModal'
import { Box, Typography, Input, FormLabel, FormControl, FormGroup, Button } from '@mui/material'
import { ArrowForward, ArrowBack } from '@mui/icons-material'
import { ActionTypes, FormState, reducer } from './useReducer'
import './style.css'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { register } from '../../api/user'
import { User } from '../../interface/user.interface'
import { LoginDto } from '../../api/dto/LoginDto.dto'
import { login } from '../../api/auth'

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

  const queryClient = useQueryClient()

  const registerMutate = useMutation({
    mutationFn: (user: User) => register(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['register'] })
    }
  })

  const loginMutate = useMutation({
    mutationFn: (payload: LoginDto) => login(payload),
    onSuccess: async (data: any, { email }) => {
      if (data.token) {
        const user = { token: data.token, email: email }
        localStorage.setItem('user', JSON.stringify(user))
        props.onLogin()
      }
      else throw Error('unable to log in')
    }
  })

  const fieldLabel = [
    { label: 'first_name', field: firstName },
    { label: 'last_name', field: lastName },
    { label: 'phone_number', field: phoneNumber },
    { label: 'email', field: email },
    { label: 'password', field: password },
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
    setCurrentStep(3)
  }

  const backRegister = () => {
    setIsLoginFrom(prev => false)
    setCurrentStep(0)
  }

  const RegisterForm = (
    <Box sx={style}>
      <Typography variant="h6" component="h2" align='center'>
        {!isLoginForm ? 'Register' : 'Login'}
      </Typography>

      <Typography align='center'>
        {!isLoginForm ? <Button onClick={handleLoginForm}>Allready have aacount? </Button>
          : <Button onClick={backRegister}>back register </Button>}
      </Typography>

      <Typography id="modal-content" sx={{ mt: 2 }} >

        {
          currentStep > 0 && !isLoginForm ||
          currentStep == fieldLabel.length - 1 && isLoginForm
          && <ArrowBack onClick={backField} />}

        <FormControl component="fieldset" variant="standard" onSubmit={submit}>
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
          : <Button onClick={submit}>{isLoginForm ? 'Login' : 'Register'}</Button>
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