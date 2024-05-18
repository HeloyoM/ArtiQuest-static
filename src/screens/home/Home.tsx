import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Typography } from '@mui/material'

import './style.css'

import AppNav from '../../components/common/navbar/AppNav'
import ArtiQuest from '../../components/artiQuest/ArtiQuest'

import { findAllUsers } from '../../api/user'

import SysadminAppNav from '../../components/common/navbar/sysAdminPanel/SysadminAppNav'
import PostsContainer from '../../components/post/PostsContainer'
import AppUserContext from '../../contextes/AppUserContext'
import { Roles } from '../../enum/Roles.enum'

const HomePage = () => {
  const { user } = useContext(AppUserContext)

  const { isLoading, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: findAllUsers
  })

  return (
    <Typography className='home'>
      <AppNav users={users} />
      {user && Roles.SysAdmin === user.role && <SysadminAppNav />}

      <ArtiQuest />

      <Typography component='p' className='arti-quest-header'>
        <h1>Arti-Quest</h1>
        <p className="transform-text">Discover programming world right under your hands</p>
      </Typography>


      <PostsContainer users={users} />

    </Typography>
  )
}

export default HomePage