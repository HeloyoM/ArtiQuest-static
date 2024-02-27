import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AppPopover from '../AppPopover'
import React, { useEffect, useMemo, useState } from 'react'
import { Button, PopoverOrigin, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import RegisterForm from '../../register/Register'
import { User } from '../../../interface/user.interface'
import './style.css'
import AppProgress from '../AppProgress'
import useDemo from './useDemo'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../../utils/paths'

type Props = {
  isdemo: boolean
  endDemo: () => void
  users: User[]
}

const AppNav = (props: Props) => {
  const [crrUser, setCurrUser] = useState<User | undefined>(undefined)
  const [openRegisterForm, setOpenRegister] = useState(false)

  const { popover } = useDemo({ endDemo: props.endDemo, isdemo: props.isdemo })

  const navigate = useNavigate()

  const onLogin = () => {
    const userStorage = localStorage.getItem('user')
    
    const user = props.users.find(u => u.email === JSON.parse(userStorage!).email)

    setCurrUser(user)
  }

  const aboutPage = () => { navigate('/about') }

  useEffect(() => {
    if (!props.users) return

    const userStorage = localStorage.getItem('user')


    if (userStorage !== null) {
      const user = props.users.find(u => u.email === JSON.parse(userStorage).email)

      setCurrUser(user)
    }


  }, [props.users])



  const handleOpenLogin = () => {
    setOpenRegister(prev => true)
  }
  const closeLoginModal = () => {
    setOpenRegister(prev => false)
  }





  // const togglePopover = (event?: React.MouseEvent<HTMLElement>) => {
  //   if (!event) return

  //   setAnchorEl(anchorEl ? null : event.currentTarget)
  // }






  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ background: props.isdemo ? 'rgba(0, 0, 0, 0.5)' : 'default' }}>

            <Button sx={{ color: 'white' }} onClick={aboutPage}>About auther</Button>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { md: 'flex' } }}>

              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                id='mail'
              >
                <Badge badgeContent={0} color="error">
                  <MailIcon />
                  {props.isdemo && popover}
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                color="inherit"
                id='notifications'
              >
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                  {props.isdemo && popover}
                </Badge>
              </IconButton>


              {crrUser ? <IconButton
                size="large"
                edge="end"
                className='account-icon'
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                id='account'
              >
                <AccountCircle className={crrUser ? 'fade-in' : ''} />
                {props.isdemo && popover}
              </IconButton> : <AppProgress type='Circular' />}

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                id='account'
              >
                <LoginIcon onClick={handleOpenLogin} />
              </IconButton>

            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <RegisterForm
        onLogin={onLogin}
        openRegisterForm={openRegisterForm}
        closeRegisterModal={closeLoginModal}
      />
    </React.Fragment>
  )
}
export default AppNav