import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Typography } from '@mui/material'

import './style.css'

import AppNav from '../../components/common/navbar/AppNav'
import ArtiQuest from '../../components/artiQuest/ArtiQuest'

import { findAllUsers } from '../../api/user'

import SysadminAppNav from '../../components/common/navbar/sysAdminPanel/SysadminAppNav'
import PostsContainer from '../../components/post/PostsContainer'

const HomePage = () => {
  const [demo, setDemo] = React.useState(false)

  const { isLoading, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: findAllUsers
  })

  const endDemo = () => {
    setDemo(false)

    localStorage.removeItem('artiQuest-demo')
  }

  React.useEffect(() => {
    const isdemo = localStorage.getItem('artiQuest-demo')

    setDemo(Boolean(isdemo))
  }, [])

  return (
    <div className={!demo ? 'home' : 'home demo'}>
      {/* <AppNav isdemo={demo} endDemo={endDemo} users={users} /> */}
      <SysadminAppNav />

      <ArtiQuest isdemo={demo} />

      <Typography component='p' className='arti-quest-header'>
        <h1>Arti-Quest</h1>
        <p className="transform-text">Discover programming world right under your hands</p>
      </Typography>


      <PostsContainer users={users} />

    </div>
  )
}

export default HomePage