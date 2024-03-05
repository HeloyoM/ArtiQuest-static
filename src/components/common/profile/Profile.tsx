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
import AppModal from '../modal/AppModal'

const Profile = () => {

    const [openApprovModal, setOpenApprovModal] = React.useState(false)
    const [changePassword, setChangePassword] = React.useState(false)
    const [isEditProfile, setIsEditProifle] = React.useState(false)

    const { first_name, email: crrEmail, last_name, phone_number: crrPhone } = React.useContext(AppUserContext).user

    const { onFormChange, resetForm, email, password, repeatedPassword, phone_number, firstName, lastName } = useUserForm()

    const { updateUserMutate } = useQueries({})

    const toggleEditPass = () => {
        setChangePassword(prev => !prev)
    }

    const closeApprovModal = () => {
        setOpenApprovModal(false)
    }
    const openApproval = () => {
        setOpenApprovModal(true)
    }

    const toggleEditProfile = () => {
        setIsEditProifle(prev => !prev)
    }

    const checkChanges = () => {
        openApproval()
    }

    const handleUpdateUserDetails = () => {
        closeApprovModal()
        try {
            const user: UpdateUserDto = { email, password, phone_number, first_name: firstName, last_name: lastName }

            updateUserMutate.mutate(user)

            resetForm()
        } catch (error) {
            throw Error('Unable to update user details')
        }
    }

    const hasChanges = Boolean(email.trim() || password.trim() || repeatedPassword.trim() || phone_number.trim() || firstName.trim() || lastName.trim())

    const approvalChanges = (
        <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        }}>
            Save changes ?

            <Button onClick={handleUpdateUserDetails}>Yes</Button>
            <Button onClick={closeApprovModal}>No</Button>
        </Box >
    )

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

                    {hasChanges && <Button variant='outlined' color='success' onClick={checkChanges}>Save</Button>}

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

            <AppModal open={openApprovModal} close={closeApprovModal} children={approvalChanges} />
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