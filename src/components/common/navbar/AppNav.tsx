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
import { getArtsInProgressFromLocalStorage } from '../../../utils/clearAllPendingArts'
import AppDropdown from '../AppDropdown'
import useInprogressArts from '../../../utils/useInprogressArts'

type Props = {
  users: User[]
}

const AppNav = (props: Props) => {
  const [openRegisterForm, setOpenRegister] = React.useState(false)

  const { users } = props

  const { authorInprogressArts } = useInprogressArts()
  const { updateUserContext, user } = React.useContext(AppUserContext)

  const artsInProgress = getArtsInProgressFromLocalStorage()

  const { popover } = useDemo({ endDemo: () => { }, isdemo: false })

  const navigate = useNavigate()

  const handleUpdateUserContext = () => {
    const decodedUser = getDecodedUser()

    if (decodedUser) {

      const userObj = users.find(u => u.id?.toString() === decodedUser.sub?.toString())

      updateUserContext(userObj)
    }

  }
  console.log({ authorInprogressArts })
  const openEditor = (id?: string) => {
    console.log({ id })
    const art_id = id ? `init-${id}` : artsInProgress[0]
    const storedArt = localStorage.getItem(art_id)
    let currArt
    if (storedArt) currArt = JSON.parse(storedArt)
    console.log({ art_id, storedArt, currArt })
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

            {!!artsInProgress.length && (<AppDropdown
              onSelect={openEditor}
              placeholder='atrs'
              items={artsInProgress.map(text => text.slice(5))}
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