import React from 'react'
import constants from '../../../utils/system/constants'
import RegExpUtil from '../../../utils/system/RegExp.util'

const initialState = {
    NUM_OF_CHART: false,
    SPECIAL_CHART: false,
    INTGERS: false,
    EMAIL: false
}

const useFormError = () => {
    const [error, setError] = React.useState(initialState)
    const [passwordDontMatch, setPasswordsDontMatch] = React.useState(false)

    const checkPasswords = (pass: string, repeatedPassword: string): void => {
        if (pass.trim() !== repeatedPassword.trim())
            setPasswordsDontMatch(true)
        else setPasswordsDontMatch(false)
    }

    const onResetForm = () => {
        setPasswordsDontMatch(false)
    }

    const validateEmail = (val: string) => {
        if (!RegExpUtil.email.test(val)) {
            setError(prev => ({ ...prev, EMAIL: true }))
        } else {
            setError(prev => ({ ...prev, EMAIL: false }))
        }
    }

    const validatePassword = (val: string) => {
        const password = val.trim()

        checkLenPass(password)

        checkSpcialCharts(password)

        checkIntegers(password)
    }

    const checkLenPass = (pass: string): void => {
        if (pass.length < constants.PASSWORD_RULES.NUM_OF_CHART) {
            setError(prev => ({ ...prev, NUM_OF_CHART: true }))
        } else if (pass.length >= constants.PASSWORD_RULES.NUM_OF_CHART) {
            setError(prev => ({ ...prev, NUM_OF_CHART: false }))
        }
    }

    const checkSpcialCharts = (pass: string) => {
        if (!RegExpUtil.special_charts.test(pass)) {
            setError(prev => ({ ...prev, SPECIAL_CHART: true }))
        } else {
            setError(prev => ({ ...prev, SPECIAL_CHART: false }))
        }
    }

    const checkIntegers = (pass: string): void => {
        if (!RegExpUtil.integers.test(pass)) {
            setError(prev => ({ ...prev, INTGERS: true }))
        } else {
            setError(prev => ({ ...prev, INTGERS: false }))
        }
    }

    return { validatePassword, onResetForm, checkPasswords, validateEmail, passwordDontMatch, error }
}

export default useFormError