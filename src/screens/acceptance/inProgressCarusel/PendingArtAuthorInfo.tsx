import React from 'react'
import { User } from '../../../interface/user.interface'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import './style.css'

type Props = {
    author: User
}
const PendingArtAuthorInfo = (props: Props) => {
    const navigate = useNavigate()

    const { id, first_name, last_name, role, phone_number, email } = props.author

    const showAllAuthorArticles = () => {
        const url = `/cat/${first_name}-${last_name}/${id}`
        navigate(url)
    }

    const baseClass = 'pending-art-'
    return (
        <Box sx={{ maxWidth: 400, width: '100%', p: 2, display: 'grid' }}>

            <Typography
                className={`pending-art-p ${baseClass}author`}
                onClick={showAllAuthorArticles}>
                <span style={{ fontWeight: 'bold' }}>full name:</span>
                {`${first_name} ${last_name}`}
            </Typography>

            <ParameterRow label={'email'} data={email} />

            <ParameterRow label={'phone'} data={phone_number} />

            <ParameterRow label={'role'} data={role} />

        </Box>
    )
}
export default PendingArtAuthorInfo

type ParamRow = {
    label: string
    data: any
}
const ParameterRow: React.FC<ParamRow> = (props) => {
    return <Typography className='pending-art-p'><span style={{ fontWeight: 'bold' }}>{props.label}:</span>{props.data}</Typography>
}