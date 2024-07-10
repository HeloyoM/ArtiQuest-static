import { useContext, useState } from 'react'
import { Box, Button } from '@mui/material'
import { EditorState } from 'draft-js'

import './style.css'

import AppEditor from '../../components/common/textEditor/AppEditor'
import useUserForm from '../../components/common/form/useUserForm'
import AppUserContext from '../../contextes/AppUserContext'

import UserProfileForm from '../../components/common/UserProfileForm'

const ContactUs = () => {
    const [rawsContent, setRawsContent] = useState(EditorState.createEmpty())

    const { onFormChange, error, firstName, lastName, email, phone_number } = useUserForm()

    const user = useContext(AppUserContext).user

    const sendMessageToSystemManager = () => {
        const messagePayload = {
            firstName: user.first_name || firstName,
            lastName: user.last_name || lastName,
            email: user.email || email,
            phone_number: user.phone_number || phone_number,
            msg: rawsContent
        }

        console.log({ messagePayload })
    }


    return (
        <>
            <Box sx={{ position: 'relative', top: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>

                <Box>
                    <AppEditor editorState={rawsContent} isReadOnly={false} setRawsContent={setRawsContent} />
                </Box>

                <UserProfileForm user={user} onFormChange={onFormChange} error={error} />

            </Box>

            <Button
                variant='contained'
                onClick={sendMessageToSystemManager}
                color='secondary'
                sx={{ width: '100%', height: '47px' }}
                type="submit">Send</Button>
        </>
    )
}

export default ContactUs