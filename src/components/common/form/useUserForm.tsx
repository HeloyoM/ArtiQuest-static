import React from 'react'
import useFormError from './useFormError'

export type FormRules = {
    NUM_OF_CHART: boolean,
    SPECIAL_CHART: boolean,
    INTGERS: boolean
    EMAIL: boolean
}

export type FormState = {
    email: string
    phone_number: string,
    firstName: string,
    lastName: string
    password: string
    repeatedPassword?: string
}

export enum FormFields {
    set_email = 'email',
    set_password = 'password',
    set_first_name = 'first_name',
    set_last_name = 'last_name',
    set_phone_number = 'phone_number',
    set_repeat_password = 'repeat_password',
    reset_form = 'reset_form'
}

const initialState: FormState = {
    email: '',
    password: '',
    phone_number: '',
    firstName: '',
    lastName: '',
    repeatedPassword: ''
}

export const reducer = (state: FormState, action: any) => {
    switch (action.type) {
        case FormFields.set_password: {
            return { ...state, password: action.password }
        }
        case FormFields.set_email: {
            return { ...state, email: action.email }
        }
        case FormFields.set_first_name: {
            return { ...state, firstName: action.firstName }
        }

        case FormFields.set_last_name: {
            return { ...state, lastName: action.lastName }
        }

        case FormFields.set_phone_number: {
            return { ...state, phoneNumber: action.phoneNumber }
        }

        case FormFields.set_repeat_password: {
            return { ...state, repeatedPassword: action.repeatedPassword }
        }

        case FormFields.reset_form: {
            return initialState;
        }

        default:
            return state
    }
}

const useUserForm = () => {
    const [{ email, password, repeatedPassword, phone_number, firstName, lastName }, localDispatch] =
        React.useReducer(reducer, initialState)

    const { validatePassword, checkPasswords, passwordDontMatch, validateEmail, onResetForm, error } = useFormError()

    const resetForm = () => {
        localDispatch({ type: FormFields.reset_form })

        onResetForm()
    }

    const onFormChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => {

        if (name === 'email') {
            validateEmail(value)
            localDispatch({ type: FormFields.set_email, email: value })
        }

        if (name === 'password') {
            validatePassword(value)
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

        if (name === 'repeat_password') {
            checkPasswords(password, value)
            localDispatch({ type: FormFields.set_repeat_password, repeatedPassword: value })
        }

        if (name === 'reset_form') {
            localDispatch({ type: FormFields.set_repeat_password, repeatedPassword: value })
        }

    }

    return { onFormChange, resetForm, passwordDontMatch, error, email, password, repeatedPassword, phone_number, firstName, lastName }
}

export default useUserForm