import React from 'react'
import './style.css'
import { Box, Button, Typography } from '@mui/material'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'

import AppUserContext from '../../../contextes/AppUserContext'
import ProfileField from './ProfileField'
import AppTooltip from '../../common/AppTooltip'

import { Profile as ProfileEnum } from '../../../enum/Profile.enum'
import useUserForm from '../useUserForm'
import useQueries from '../../register/useQueries'
import { UpdateUserDto } from '../../../api/dto/UpdateUser.dto'
import getDecodedUser from '../../../api/getDecodedUser'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { User } from '../../../interface/user.interface'
import { findAllUsers } from '../../../api/user'

const Profile = () => {

    const [changePassword, setChangePassword] = React.useState(false)
    const [isEditProfile, setIsEditProifle] = React.useState(false)

    const queryClient = useQueryClient()

    const sysUsers = queryClient.getQueryData(['users']) as User[]

    const { user, updateUserContext } = React.useContext(AppUserContext)

    const { first_name, email: crrEmail, last_name, phone_number: crrPhone } = user

    const { onFormChange, resetForm, email, password, repeatedPassword, phone_number, firstName, lastName } = useUserForm()

    const { updateUserMutate } = useQueries({})

    const toggleEditPass = () => {
        setChangePassword(prev => !prev)
    }

    const toggleEditProfile = () => {
        setIsEditProifle(prev => !prev)
    }



    const handleUpdateUserDetails = () => {
        try {
            const user: UpdateUserDto = { email, password, phone_number, first_name: firstName, last_name: lastName }

            updateUserMutate.mutate(user)

            resetForm()

            toggleEditProfile()
        } catch (error) {
            throw Error('Unable to update user details')
        }
    }

    const hasChanges = Boolean(email.trim() || password.trim() || repeatedPassword.trim() || phone_number.trim() || firstName.trim() || lastName.trim())

    return (
        <React.Fragment>

            <Typography className='header'>Account profile</Typography>


            <div className='profile-actions'>

                <AppTooltip title='edit'>
                    <CreateOutlinedIcon onClick={toggleEditProfile} />
                </AppTooltip>

            </div>


            <Box sx={style}>

                <Box component='div' className='profile-container'>

                    <ProfileField
                        handleChange={onFormChange}
                        isEditProfile={isEditProfile}
                        label={ProfileEnum.FIRST_NAME}
                        value={first_name} />

                    <ProfileField
                        handleChange={onFormChange}
                        isEditProfile={isEditProfile}
                        label={ProfileEnum.LAST_NAME}
                        value={last_name} />

                    <ProfileField
                        handleChange={onFormChange}
                        isEditProfile={isEditProfile}
                        label={ProfileEnum.EMAIL}
                        value={crrEmail} />

                    <ProfileField
                        handleChange={onFormChange}
                        isEditProfile={isEditProfile}
                        label={ProfileEnum.PHONE_NUM}
                        value={crrPhone} />

                    <Button variant='outlined' color='success' onClick={toggleEditPass}>Change password</Button>

                    {hasChanges && <Button variant='outlined' color='success' onClick={handleUpdateUserDetails}>Save</Button>}

                </Box>
            </Box>

            {changePassword &&
                <Box sx={{ ...style, marginTop: '5%' }}>
                    <Box component='div' className='profile-container'>
                        <ProfileField
                            handleChange={onFormChange}
                            isEditProfile
                            label={ProfileEnum.PASS}
                            value='' />

                        <ProfileField
                            handleChange={onFormChange}
                            isEditProfile
                            label={ProfileEnum.REPEAT_PASS}
                            value='' />

                    </Box>
                </Box>
            }
        </React.Fragment>
    )
}

export default Profile

const style = {
    bgcolor: 'background.paper',
    width: '100%',
    border: '1px solid lightgrey',
    p: 4,
    position: 'relative',
    top: '20%'
}