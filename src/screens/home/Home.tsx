import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Box, Paper, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import './style.css'

import AppNav from '../../components/common/navbar/AppNav'
import ArtiQuest from '../../components/artiQuest/ArtiQuest'

import { findAllUsers } from '../../api/user'

import SysadminAppNav from '../../components/common/navbar/sysAdminPanel/SysadminAppNav'
import AppUserContext from '../../contextes/AppUserContext'
import { Roles } from '../../enum/Roles.enum'

const HomePage = () => {

  const { user } = useContext(AppUserContext)

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: findAllUsers
  })

  const isSysAdmin = user && Roles.SysAdmin === user.role

  return (
    <Box className='home'>
      <AppNav users={users} />
      {isSysAdmin && <SysadminAppNav />}

      <ArtiQuest />

      <Typography component='p' className='arti-quest-header'>
        <h1>Arti-Quest</h1>
        <p className="transform-text">Upload {<ArrowForwardIcon />} Edit {<ArrowForwardIcon />} Publish</p>
        <p className="transform-text">Simple</p>
      </Typography>

      <Paper elevation={3} sx={{ width: "45%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItmes: 'center', margin: '3% auto', backgroundColor: 'inherit', fontFamily: 'Sora, sens-serif' }}>

        <Typography sx={{ fontSize: '19px', color: 'cornflowerblue' }} className="banner">
          All in one
        </Typography>
        <Typography sx={{ fontSize: '19px', fontFamily: 'Sora, sens-serif' }} className="banner">
          Your platform for uploading PDF file, edit and style easily and publish.
        </Typography>
      </Paper>

    </Box>
  )
}

export default HomePage