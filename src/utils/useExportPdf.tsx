import { useCallback } from "react"
import { pdf } from "@react-pdf/renderer"


type Props = {
    reactPdfInstance: JSX.Element
}

const Export = ({ reactPdfInstance }: Props) => {
    const handleGeneratePdf = async () => {
        return new Promise((resolve, reject) => {

            const PDFContent = pdf(reactPdfInstance)

            PDFContent.toBlob().then((blob) => {
                const reader = new FileReader()

                reader.readAsDataURL(blob)

                reader.onloadend = () => {
                    const base64 = reader.result

                    resolve(base64)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    }

    const handleSendPdf = async () => {
        await handleGeneratePdf()
            .then(handleSendPdfToServer)
            .catch((err) => console.log(err))
    }

    const handleSendPdfToServer = useCallback((pdfData: any) => {
        console.log(pdfData)
    }, [])

    return { handleSendPdf }
}

export default Export