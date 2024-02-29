import React from 'react'
import fileUpload from '../../assets/fileUpload.svg'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import AppTooltip from '../common/AppTooltip'
import './style.css'
import getToken from '../../api/getDecodedUser'
import AppUserContext from '../../contextes/AppUserContext'

type Props = {
    downloadArticle: () => void
    toggleEdit: () => void
}
const ArtActions = (props: Props) => {
    const [userLoggedIn, setUserLoggedIn] = React.useState(false)

    const { user } = React.useContext(AppUserContext)

    return (
        <div className='art-actions'>

            <AppTooltip title='download'>
                <img
                    src={fileUpload}
                    alt='download-file'
                    onClick={props.downloadArticle}
                />
            </AppTooltip>

            {user && <AppTooltip title='edit'>
                <CreateOutlinedIcon onClick={props.toggleEdit} />
            </AppTooltip>}

        </div>
    )
}

export default ArtActions