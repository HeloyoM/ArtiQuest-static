import { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Box, Button, TextField } from '@mui/material'
import { EditorState, convertToRaw } from 'draft-js'

import './style.css'

import AppEditor from '../../components/common/textEditor/AppEditor'
import useUserForm from '../../components/common/form/useUserForm'
import AppUserContext from '../../contextes/AppUserContext'

import UserProfileForm from '../../components/common/UserProfileForm'
import { sendContactMsg } from '../../api/user'
import { ContactMsgDto } from '../../api/dto/ContactMsg.dto'
import { stateToHTML } from 'draft-js-export-html'

const ContactUs = () => {
    const [topic, setTopic] = useState('')
    const [rawsContent, setRawsContent] = useState(EditorState.createEmpty())

    const contactUsMsg = useMutation({
        mutationFn: (payload: ContactMsgDto) => sendContactMsg(payload),
        mutationKey: ['create-article'],
    })

    const { onFormChange, error, firstName, lastName, email, phone_number } = useUserForm()

    const user = useContext(AppUserContext).user

    const handleChange = (val: string) => {
        setTopic(val.trim())
    }

    const sendMessageToSystemManager = () => {
        const messagePayload: ContactMsgDto = {
            sender: {
                id: user.id,
                first_name: user.first_name || firstName,
                last_name: user.last_name || lastName,
                email: user.email || email,
                phone_number: user.phone_number || phone_number,
            },
            topic,
            msg: stateToHTML(rawsContent.getCurrentContent())
        }

        contactUsMsg.mutate(messagePayload)
    }

    return (
        <>
            <Box sx={{ position: 'relative', top: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>

                <Box>
                    <TextField label="topic" variant="outlined" onChange={e => handleChange(e.target.value)} />

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