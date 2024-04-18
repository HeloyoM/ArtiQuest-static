import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArtActions from './ArtActions'
import AppModal from '../common/modal/AppModal'
import PdfReview from './arti-pdf/PdfReview'
import PdfDownloading from './arti-pdf/PdfDownloading'
import PdfTemplate from './arti-pdf/PdfContent'
import { Article as IArticle } from '../../interface/article.interface'
import useExportPdf from '../../utils/useExportPdf'
import './style.css'
import useCategoryQueries from '../category/useCategoryQueries'
import { ICategory } from '../../interface/category.interface'


type Props = {
    art: IArticle
    toggleEdit: () => void
    editArticleMutate: () => void
    category?: string
}

const ArtiTitle = (props: Props) => {
    const [isSticky, setSticky] = React.useState(false)
    const [artOpen, setArtOpen] = React.useState(false)


    const instance = (<PdfTemplate art={props.art!} />)

    const closePdf = () => { setArtOpen(false) }
    const openArticle = () => { setArtOpen(true) }

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

    const pdfViewer = (<div className='pdf-view' >
        <PdfReview>{instance}</PdfReview>

        <PdfDownloading art={instance} title={props.art.title} />
    </div>)

    const handleShowCategory = () => {
        // const categoryId = getCategoriesInfo.data.filter((cat: ICategory) => cat.name?.trim() === props.category?.trim())
        // console.log({ categoryId })
        // navigate(`/cat/${props.category}/${props.category?.id}`)
    }
    return (
        <>
            <div className={isSticky ? 'title sticky' : 'title'} >
                <h1>{props.art.title}</h1>
                {props.art.active && <ArtActions
                    downloadArticle={openArticle}
                    toggleEdit={props.toggleEdit}
                />}

                <p onClick={handleShowCategory}>{props.category}</p>
            </div>

            <AppModal
                popupModal={false}
                open={artOpen}
                close={closePdf}
                children={pdfViewer}
            />
        </>
    )
}

export default ArtiTitle