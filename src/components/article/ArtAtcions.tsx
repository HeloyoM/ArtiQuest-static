import fileUpload from '../../assets/fileUpload.svg'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import './style.css'
import AppTooltip from '../common/AppTooltip'
import React from 'react'

type Props = {
    downloadArticle: () => void
    toggleEdit: () => void
}
const ArtActions = (props: Props) => {
    const [userLoggedIn, setUserLoggedIn] = React.useState(false)

    React.useEffect(() => {
        const user = localStorage.getItem('user')

        if (user)
            setUserLoggedIn(true)
    }, [])

    return (
        <div className='art-actions'>
            <AppTooltip title='download'>
                <img
                    src={fileUpload}
                    alt='download-file'
                    onClick={props.downloadArticle}
                />
            </AppTooltip>

            {userLoggedIn && <AppTooltip title='edit'>
                <CreateOutlinedIcon onClick={props.toggleEdit} />
            </AppTooltip>}

        </div>
    )
}

export default ArtActions