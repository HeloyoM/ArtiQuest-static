import fileUpload from '../../assets/fileUpload.svg'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import './style.css'

type Props = {
    downloadArticle: () => void
}
const ArtActions = (props: Props) => {
    return (
        <div className='art-actions'>
            <img
                src={fileUpload}
                alt='file-upload'
                className='download'
                onClick={props.downloadArticle}
            />

            <CreateOutlinedIcon />
        </div>
    )
}

export default ArtActions