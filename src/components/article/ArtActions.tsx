import fileUpload from '../../assets/fileUpload.svg'
import AppTooltip from '../common/AppTooltip'
import './style.css'

type Props = {
    downloadArticle: () => void
}
const ArtActions = (props: Props) => {
    return (
        <div className='art-actions'>

            <AppTooltip title='download'>
                <img
                    src={fileUpload}
                    alt='download-file'
                    onClick={props.downloadArticle}
                />
            </AppTooltip>
        </div>
    )
}

export default ArtActions