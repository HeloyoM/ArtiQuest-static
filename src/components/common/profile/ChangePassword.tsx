import React from 'react'
import { Box, Typography } from '@mui/material'
import './style.css'

import AppProgress from '../AppProgress'
import ProfileField from './ProfileField'
import SaveButton from '../SaveButton'

import { FormRules } from '../form/useUserForm'
import langsFile from '../../../utils/langs-file.json'
import { Profile as ProfileEnum } from '../../../enum/Profile.enum'

type Props = {
    onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    passwordDontMatch: boolean
    isUpdatePending: boolean
    serverMessage: any
    error: FormRules
    hasPassChange: boolean
    openApproval: () => void
    disabledChangePassowrd: boolean
}
const ChangePassword = (props: Props) => {
    const { onFormChange, serverMessage, error, openApproval, disabledChangePassowrd, hasPassChange, passwordDontMatch, isUpdatePending } = props

    return (
        <Box sx={{ ...style }} className='change-pass-container'>

            <ContainerHeader
                isUpdatePending={isUpdatePending}
                passwordDontMatch={passwordDontMatch}
                serverMessage={serverMessage} />

            <Box component='div' className='profile-password-container' >
                <ProfileField
                    handleChange={onFormChange}
                    isEditProfile
                    label={ProfileEnum.PASS}
                    helperText={error}
                />

                <ProfileField
                    handleChange={onFormChange}
                    isEditProfile
                    label={ProfileEnum.REPEAT_PASS}
                />


            </Box>

            {hasPassChange ? <SaveButton handleSave={openApproval} disabled={disabledChangePassowrd} /> : <></>}

        </Box>
    )
}

export default ChangePassword


const style = {
    bgcolor: 'background.paper',
    width: '100%',
    border: '1px solid lightgrey',
    p: 4,
    position: 'relative',
    top: '20%'
}

type ContainerProps = {
    passwordDontMatch: boolean
    isUpdatePending: boolean
    serverMessage: boolean
}
const ContainerHeader = (props: ContainerProps) => {
    const { isUpdatePending, passwordDontMatch, serverMessage } = props

    if (isUpdatePending) return <AppProgress type='Line' />

    return (
        <React.Fragment>
            {passwordDontMatch && <Typography sx={{ textAlign: 'center' }}>
                {langsFile.system.registeration.passwordRules.passwords_not_match}
            </Typography>}

            {serverMessage && <Typography sx={{ textAlign: 'center' }}>
                {serverMessage}
            </Typography>}
            
        </React.Fragment>
    )
}