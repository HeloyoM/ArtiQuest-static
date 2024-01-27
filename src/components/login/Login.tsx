import { useState } from 'react'
import AppModal from '../common/modal/AppModal'
import { Box, Typography } from '@mui/material'

type Props = {
  openLogin: boolean
  closeLoginModal: () => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Login = (props: Props) => {

  const loginForm = (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </Box>
  )

  return (
    <div>
      <AppModal popupModal open={props.openLogin} close={props.closeLoginModal} >
        {loginForm}
      </AppModal>
    </div>
  )
}

export default Login