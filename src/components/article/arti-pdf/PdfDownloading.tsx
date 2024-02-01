import { PDFDownloadLink } from '@react-pdf/renderer'
import DownloadIcon from '@mui/icons-material/Download'

type Props = {
    art: JSX.Element
    title: string
}
const PdfDownloading = (props: Props) => {
    return (
        <div>
            <PDFDownloadLink document={props.art} fileName={props.title}>
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : <DownloadIcon width={40} height={40} />
                }
            </PDFDownloadLink>
        </div>
    )
}

export default PdfDownloading