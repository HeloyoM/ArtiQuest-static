import React from 'react'
import './style.css'
import { Box } from '@mui/material'
import AppProgress from '../common/AppProgress'
import useArticleEditor from '../artEditor/useArticleEditor'
import { useNavigate } from 'react-router-dom'
import MenuV2 from './MenuV2'

type Props = {
    index: number
    handleNext: () => void
    endStage: boolean
}

const Menu = (props: Props) => {
    const { endStage, handleNext, index } = props

    const { article } = useArticleEditor({ handleNext: handleNext })

    const navigate = useNavigate()

    React.useEffect(() => {
        const art = localStorage.getItem(`init-${article?.id}`)

        if (art) {

            const artObj = JSON.parse(art)

            if (endStage && article) {

                navigate(`/cat/${artObj.cat.name}/art/${artObj.title}/${artObj.id}`)

            }
        }

    }, [props.endStage])

    if (!article) return (<AppProgress />)

    return (
        <Box className='editor-menu'>

            <MenuV2 endStage={endStage} handleNext={handleNext} index={index} />

        </Box>
    )
}

export default Menu