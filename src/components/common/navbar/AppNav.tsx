import AppBar from '@mui/material/AppBar'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"
import { Badge, IconButton, Toolbar, Button, Box } from '@mui/material'
import { Notifications, Mail, AccountCircle, Login as ConnectIcon } from '@mui/icons-material'

import './style.css'

import RegisterForm from '../../register/Register'
import AppProgress from '../AppProgress'
import NavBtnAction from './NavBtnAction'

import useDemo from './useDemo'
import getToken from '../../../api/getToken'

import AppUserContext from '../../../contextes/AppUserContext'
import { User } from '../../../interface/user.interface'

type Props = {
  isdemo: boolean
  endDemo: () => void
  users: User[]
}

const AppNav = (props: Props) => {
  const [openRegisterForm, setOpenRegister] = React.useState(false)

  const { user: crrUser, updateUserContext } = React.useContext(AppUserContext)
  const { popover } = useDemo({ endDemo: props.endDemo, isdemo: props.isdemo })

  const navigate = useNavigate()

  const onLogin = () => {
    const token = getToken()

    if (token) {
      const userInfo = jwtDecode(token)

      const userObj = props.users.find(u => u.id?.toString() === userInfo.sub?.toString())

      updateUserContext(userObj)
    }

  }

  const goAboutPage = () => {
    navigate('/about')
  }


  const openConnectionForm = () => {
    setOpenRegister(prev => true)
  }
  const closeLoginModal = () => {
    setOpenRegister(prev => false)
  }

  console.log({ crrUser })

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ background: props.isdemo ? 'rgba(0, 0, 0, 0.5)' : 'default' }}>

            <Button sx={{ color: 'white' }} onClick={goAboutPage}>About author</Button>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { md: 'flex' } }}>

              <NavBtnAction
                popover={{ elem: popover, id: 'mail' }}
                btn={
                  <Badge badgeContent={0} color="error">
                    <Mail />
                  </Badge>}
              />

              <NavBtnAction
                popover={{ elem: popover, id: 'notifications' }}
                btn={<Badge badgeContent={0} color="error"
                >
                  <Notifications />
                </Badge>}
              />

              {crrUser
                ? <NavBtnAction popover={{ elem: popover, id: 'account' }} btn={<AccountCircle onClick={openConnectionForm} />} />
                : <AppProgress type='Circular' />}

              <NavBtnAction popover={{ elem: popover, id: 'account' }} btn={<ConnectIcon onClick={openConnectionForm} />} />

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