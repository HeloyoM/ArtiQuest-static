import React from 'react'
import './style.css'
import { Box, Button, Typography } from '@mui/material'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'

import AppUserContext from '../../../contextes/AppUserContext'
import ProfileField from './ProfileField'
import AppTooltip from '../../common/AppTooltip'

import { Profile as ProfileEnum } from '../../../enum/Profile.enum'
import useUserForm from '../form/useUserForm'
import useQueries from '../../register/useQueries'
import { UpdateUserDto } from '../../../api/dto/UpdateUser.dto'
import AppModal from '../modal/AppModal'
import langsFile from '../../../utils/langs-file.json'
import SaveButton from '../SaveButton'
import AppProgress from '../AppProgress'
import ChangePassword from './ChangePassword'

const Profile = () => {

    const [openApprovModal, setOpenApprovModal] = React.useState(false)
    const [changePassword, setChangePassword] = React.useState(false)
    const [isEditProfile, setIsEditProifle] = React.useState(false)

    const { first_name, email: crrEmail, last_name, phone_number: crrPhone } = React.useContext(AppUserContext).user

    const {
        onFormChange,
        resetForm,
        passwordDontMatch,
        email,
        error,
        password,
        repeatedPassword,
        phone_number,
        firstName,
        lastName
    } = useUserForm()

    const { updateUserMutate, serverMessage, setServerMessage } = useQueries({})

    const toggleEditPass = () => {
        resetForm()
        
        setServerMessage('')

        if (isEditProfile) setIsEditProifle(false)

        setChangePassword(prev => !prev)
    }

    const closeApprovModal = () => {
        setOpenApprovModal(false)
    }
    const openApproval = () => {
        setOpenApprovModal(true)
    }

    const toggleEditProfile = () => {
        if (changePassword) setChangePassword(false)

        setIsEditProifle(prev => !prev)
    }

    const handleUpdateUserDetails = () => {
        setServerMessage('')

        closeApprovModal()
        try {
            const user: UpdateUserDto = { email, password, phone_number, first_name: firstName, last_name: lastName }

            updateUserMutate.mutate(user)

            resetForm()
        } catch (error) {
            throw Error('Unable to update user details')
        }
    }

    const correctPasswordPattern = Object.values(error).every((value) => {
        return value === false
    })

    const hasChanges = Boolean(email.trim() || phone_number.trim() || firstName.trim() || lastName.trim())

    const hasPassChange = Boolean(password.trim() || repeatedPassword.trim())

    const approvalChanges = (
        <Box sx={modalStyle}>
            {langsFile.system.profile.approval}
            <Button onClick={handleUpdateUserDetails}>{langsFile.casual.yes}</Button>
            <Button onClick={closeApprovModal}>{langsFile.casual.no}</Button>
        </Box >
    )

    const disabledChangePassowrd = !correctPasswordPattern || passwordDontMatch || !repeatedPassword.trim().length

    return (
        <React.Fragment>

            <Typography className='header'>Account profile</Typography>


            <div className='profile-actions'>

                <AppTooltip title='edit'>
                    <CreateOutlinedIcon onClick={toggleEditProfile} />
                </AppTooltip>

            </div>

            <Box sx={style} style={{ borderTop: '20px solid green', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>

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
                        value={crrEmail}
                        helperText={error.EMAIL} />

                    <ProfileField
                        handleChange={onFormChange}
                        isEditProfile={isEditProfile}
                        label={ProfileEnum.PHONE_NUM}
                        value={crrPhone} />

                    <Button variant='outlined' color='success' onClick={toggleEditPass}>Change password</Button>

                    {hasChanges ? <SaveButton handleSave={handleUpdateUserDetails} /> : <></>}

                </Box>
            </Box>

            {
                changePassword && <ChangePassword
                    disabledChangePassowrd={disabledChangePassowrd}
                    error={error}
                    hasPassChange={hasPassChange}
                    isUpdatePending={updateUserMutate.isPending}
                    onFormChange={onFormChange}
                    openApproval={openApproval}
                    passwordDontMatch={passwordDontMatch}
                    serverMessage={serverMessage}
                />
            }

            <AppModal open={openApprovModal} close={closeApprovModal} children={approvalChanges} />
        </React.Fragment >
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

const modalStyle = {
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