import { PDFViewer } from '@react-pdf/renderer'
import React, { FC } from 'react'

type Props = {
    children: JSX.Element
}
const PdfReview: FC<Props> = ({ children }) => {
    return (
        <PDFViewer width={1000} height={600} showToolbar={false}>
            {children}
        </PDFViewer >
    )
}

export default PdfReview