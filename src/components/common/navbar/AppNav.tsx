import React from 'react'
import AppBar from '@mui/material/AppBar'
import { useNavigate } from 'react-router-dom'
import { Toolbar, Button, Box } from '@mui/material'

import './style.css'

import RegisterForm from '../../register/Register'

import useDemo from './useDemo'
import getDecodedUser from '../../../api/getDecodedUser'

import AppUserContext from '../../../contextes/AppUserContext'
import { User } from '../../../interface/user.interface'
import NavbarButtons from './NavbarButtons'
import AppModal from '../modal/AppModal'
import Profile from '../profile/Profile'
import { Paths } from '../../../utils/paths'
import { getArtsInProgressFromLocalStorage } from '../../../utils/pendingArtsStorage'
import AppDropdown from '../AppDropdown'
import useInprogressArts from '../../../utils/useInprogressArts'

type Props = {
  users: User[]
}

const AppNav = (props: Props) => {
  const [openRegisterForm, setOpenRegister] = React.useState(false)

  const { users } = props

  const { livePendingArts } = useInprogressArts()
  const { updateUserContext, user } = React.useContext(AppUserContext)

  // const artsInProgress = getArtsInProgressFromLocalStorage()

  const { popover } = useDemo({ endDemo: () => { }, isdemo: false })

  const navigate = useNavigate()

  const handleUpdateUserContext = () => {
    const decodedUser = getDecodedUser()

    if (decodedUser) {

      const userObj = users.find(u => u.id?.toString() === decodedUser.sub?.toString())

      updateUserContext(userObj)
    }

  }

  const openEditor = (id?: string) => {
    const art_id = id ? `init-${id}` : livePendingArts[0]
    const storedArt = localStorage.getItem(art_id)
    let currArt
    if (storedArt) currArt = JSON.parse(storedArt)
    navigate(`/art-editor/${currArt.id}`)
  }

  const handleOpenProfile = () => {
    if (user)
      navigate(`/profile/${user.first_name}-${user.last_name}/${user.id}`)
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

  const handleOpenAuthorControl = () => {
    navigate(`/author/${user.id}`)
  }

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <Button sx={{ color: 'white' }} onClick={goAboutPage}>About author</Button>

            {!!livePendingArts.length && (<AppDropdown
              onSelect={openEditor}
              placeholder={`${livePendingArts.length} pending`}
              items={livePendingArts}
            />)
            }

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { md: 'flex' } }}>

              <NavbarButtons
                popover={popover}
                openConnectionForm={openConnectionForm}
                handleOpenProfile={handleOpenProfile}
                handleOpenAuthorControl={handleOpenAuthorControl}
              />

            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <RegisterForm
        onLogin={handleUpdateUserContext}
        openRegisterForm={openRegisterForm}
        closeRegisterModal={closeLoginModal}
      />

    </React.Fragment >
  )
}
export default AppNav