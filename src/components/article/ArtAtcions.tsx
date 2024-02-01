import fileUpload from '../../assets/fileUpload.svg'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import './style.css'
import AppTooltip from '../common/AppTooltip'

type Props = {
    downloadArticle: () => void
}
const ArtActions = (props: Props) => {
    return (
        <div className='art-actions'>
            <AppTooltip title='download'>
                <img
                    src={fileUpload}
                    alt='file-upload'
                    onClick={props.downloadArticle}
                />
            </AppTooltip>
            <AppTooltip title='edit'>
                <CreateOutlinedIcon />
            </AppTooltip>
        </div>
    )
}

export default ArtActions