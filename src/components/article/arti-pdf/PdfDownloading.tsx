import { PDFDownloadLink } from '@react-pdf/renderer'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

type Props = {
    art: JSX.Element
    title: string
}
const PdfDownloading = (props: Props) => {
    return (
        <div>
            <PDFDownloadLink document={props.art} fileName={props.title}>
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : <FileDownloadOutlinedIcon width={40} height={40} />
                }
            </PDFDownloadLink>
        </div>
    )
}

export default PdfDownloading