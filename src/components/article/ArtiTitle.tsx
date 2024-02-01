import React from 'react'
import ArtActions from './ArtAtcions'

type Props = {
    title: string
    downloadArticle: () => void
}
const ArtiTitle = (props: Props) => {
    const [isSticky, setSticky] = React.useState(false)

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
        <div className={isSticky ? 'title sticky' : 'title'} >
            <h1>{props.title}</h1>
            <ArtActions downloadArticle={props.downloadArticle} />
        </div>
    )
}

export default ArtiTitle