import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AppPopover from './AppPopover'
import { useEffect, useMemo, useState } from 'react'
import { Button, PopoverOrigin, PopoverPosition } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import Login from '../login/Login'

type Props = {
  isdemo: boolean
  closeDemo: () => void
}

const AppNav = (props: Props) => {
  const [openLogin, setOpenLogin] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [demoSession, setDemoSession] = useState<(HTMLElement | null)[]>([])
  const [indexSession, setIndexSession] = useState<number>(0)

  const explanationStrings = [
    `when some new articels or new products published you will alerted here.`,
    `In case you'll get some personal message you have this mail section. you can contect us there too.`,
    `Here you can see your profile, edit your details and make more personal things`
  ]

  useEffect(() => {
    if (props.isdemo) {
      startDemo()
    }
  }, [props.isdemo])

  const startDemo = () => {
    setDemoSession(definedEl())
  }

  useEffect(() => {
    if (demoSession.length) {
      setAnchorEl(demoSession[indexSession])
    }
  }, [demoSession])

  const handleOpenLogin = () => {
    setOpenLogin(prev => true)
  }
  const closeLoginModal = () => {
    setOpenLogin(prev => false)
  }

  const definedEl = () => {
    const email = document.getElementById('mail')
    const notifications = document.getElementById('notifications')
    const account = document.getElementById('account')
    const navbarEl = [email, notifications, account]

    return navbarEl
  }

  const nextDemo = () => {
    if (indexSession >= demoSession.length - 1) {
      exitDemoMode()
    }

    const incIndex = indexSession + 1
    setAnchorEl(null)

    setTimeout(() => {
      setIndexSession(prev => incIndex)
      setAnchorEl(demoSession[incIndex])
    }, 1000)
  }

  const demoProgress = useMemo(() => {
    if (indexSession >= demoSession.length - 1) return 'End'

    else return 'Next'
  }, [anchorEl, indexSession, demoSession])

  const togglePopover = (event?: React.MouseEvent<HTMLElement>) => {
    if (!event) return

    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const exitDemoMode = () => {
    setAnchorEl(null)
    props.closeDemo()
  }

  const popoverOpen = Boolean(anchorEl)

  const anchorOrigin: PopoverOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
  }

  const popover = useMemo(() => {
    return (
      <AppPopover anchorEl={anchorEl} position={anchorOrigin} open={popoverOpen}>
        <Box sx={{ padding: '8px', height: '119px', wordBreak: 'break-word' }}>
          {explanationStrings[indexSession]}
        </Box>
        <Button onClick={nextDemo}>{demoProgress}</Button>
      </AppPopover>
    )
  }, [anchorEl, popoverOpen, demoSession])

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ background: props.isdemo ? 'rgba(0, 0, 0, 0.5)' : 'default' }}>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                id='mail'
                onClick={togglePopover}

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
                onClick={togglePopover}
              >
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                  {props.isdemo && popover}
                </Badge>
              </IconButton>


              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={togglePopover}
                color="inherit"
                id='account'
              >
                <AccountCircle />
                {props.isdemo && popover}
              </IconButton>

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={togglePopover}
                color="inherit"
                id='account'
              >
                <LoginIcon onClick={handleOpenLogin} />
              </IconButton>

            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Login openLogin={openLogin} closeLoginModal={closeLoginModal} />
    </>
  )
}
export default AppNav