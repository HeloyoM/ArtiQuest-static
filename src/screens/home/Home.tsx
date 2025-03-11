import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Typography } from '@mui/material'
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
    <Typography className='home'>
      <AppNav users={users} />
      {isSysAdmin && <SysadminAppNav />}

      <ArtiQuest />

      <Typography component='p' className='arti-quest-header'>
        <h1>Arti-Quest</h1>
        <p className="transform-text">Upload {<ArrowForwardIcon />} Edit {<ArrowForwardIcon />} Publish</p>
        <p className="transform-text">Simple</p>
      </Typography>

    </Typography>
  )
}

export default HomePage