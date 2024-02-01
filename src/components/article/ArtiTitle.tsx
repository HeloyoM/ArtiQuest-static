import React from 'react'
import ArtActions from './ArtAtcions'
import AppModal from '../common/modal/AppModal'
import PdfReview from './arti-pdf/PdfReview'
import PdfDownloading from './arti-pdf/PdfDownloading'
import PdfTemplate from './arti-pdf/PdfContent'
import { Article as IArticle } from '../../interface/article.interface'
import useExportPdf from '../../utils/useExportPdf'
import './style.css'

type Props = {
    art: IArticle
    title: string
    toggleEdit: () => void
}

const ArtiTitle = (props: Props) => {
    const [isSticky, setSticky] = React.useState(false)
    const [artOpen, setArtOpen] = React.useState(false)

    const instance = (<PdfTemplate art={props.art!} />)

    const { handleSendPdf } = useExportPdf({ reactPdfInstance: instance })

    const closePdf = () => {
        setArtOpen(false)
    }

    const openArticle = () => {
        setArtOpen(true)
    }

    React.useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY > 0) {
                setSticky(true)
            } else {
                setSticky(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            <div className={isSticky ? 'title sticky' : 'title'} >
                <h1>{props.title}</h1>
                <ArtActions downloadArticle={openArticle} toggleEdit={props.toggleEdit}/>
            </div>

            <AppModal
                popupModal={false}
                open={artOpen}
                close={closePdf}
                children={
                    <div className='pdf-view' >
                        <PdfReview>{instance}</PdfReview>
                        <PdfDownloading art={instance} title={props.title} />
                    </div>
                }
            />
        </>
    )
}

export default ArtiTitle