import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import './style.css'

type Props = {
    close: () => void
    open: boolean
    popupModal: boolean
    children: JSX.Element
}



const AppModal = (props: Props) => {
    return (
        <Modal
            className={props.popupModal ? 'popup-modal' : ''}
            open={props.open}
            onClose={props.close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {props.children}
        </Modal>
    )
}

export default AppModal