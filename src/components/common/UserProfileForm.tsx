import { Box } from '@mui/material'
import React from 'react'
import ProfileField from './profile/ProfileField'
import { Profile as ProfileEnum } from '../../enum/Profile.enum'
import { User } from '../../interface/user.interface'
import { FormRules } from './form/useUserForm'

type Props = {
    onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    user: User
    error: FormRules
    footerForm?: JSX.Element
}
const UserProfileForm = ({ onFormChange, user, error, footerForm }: Props) => {
    const { first_name, last_name, email, phone_number } = user

    const senderPersonalDetails = (
        <Box sx={style} style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>

            <Box component='div' className='profile-container'>

                <ProfileField
                    handleChange={onFormChange}
                    isEditProfile
                    label={ProfileEnum.FIRST_NAME}
                    value={first_name} />

                <ProfileField
                    handleChange={onFormChange}
                    isEditProfile
                    label={ProfileEnum.LAST_NAME}
                    value={last_name} />

                <ProfileField
                    handleChange={onFormChange}
                    isEditProfile
                    label={ProfileEnum.EMAIL}
                    value={email}
                    helperText={error.EMAIL} />

                <ProfileField
                    handleChange={onFormChange}
                    isEditProfile
                    label={ProfileEnum.PHONE_NUM}
                    value={phone_number} />


                {footerForm}
            </Box>
        </Box >
    )

    return senderPersonalDetails
}

export default UserProfileForm

const style = {
    bgcolor: 'background.paper',
    width: '100%',
    border: '1px solid lightgrey',
    p: 4,
    position: 'relative',
    top: '20%'
}