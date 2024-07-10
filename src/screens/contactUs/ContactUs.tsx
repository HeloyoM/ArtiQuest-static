import { useContext, useState } from 'react'
import { Box } from '@mui/material'
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

    return (
        <Box sx={{ position: 'relative', top: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>

            <Box>
                <AppEditor editorState={rawsContent} isReadOnly={false} setRawsContent={setRawsContent} />
            </Box>

            <UserProfileForm user={user} onFormChange={onFormChange} error={error} />

        </Box>
    )
}

export default ContactUs