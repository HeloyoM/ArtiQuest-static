import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Box, Typography } from '@mui/material'

import AppProgress from '../../components/common/AppProgress'
import useCategoriesTable from '../../components/categoriesTableManagement/useCategoriesTable'
import InProgressCarusel from './inProgressCarusel/InProgressCarusel'

import { getAllInprogressArts } from '../../api/article'
import { Article } from '../../interface/article.interface'
import { StepItem } from './StepItem.interface'

const AcceptanceScreen = () => {
    const [inProgressArts, setInprogressArts] = useState<StepItem[]>([])

    const { main } = useCategoriesTable()

    const { isLoading, data } = useQuery({
        queryKey: ['in-progress'],
        queryFn: getAllInprogressArts,
    })

    useEffect(() => {
        if (!data) return

        const steps: StepItem[] = []

        data.map((art: Article) => {
            const { body, title, id } = art
            const brife = body.slice(0, 100)
            steps.push({ id, label: title, description: brife, author: art.author, ttl: art.ttl })
        })

        setInprogressArts(steps)
    }, [data])

    if (!main) return <AppProgress type="Line" />

    return (
        <Box>
            <Typography align="center">Pending articles</Typography>

            {main}

            {!!inProgressArts.length && !isLoading && (<Box p={3}>
                <Typography align="center" sx={{ fontWeight: 'bold' }}>Coming soon - articles in progress </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center' }} m={2}>
                    <InProgressCarusel steps={inProgressArts} />
                </Box>
            </Box>)}

            {isLoading && <AppProgress type="Line" />}
        </Box>
    )
}

export default AcceptanceScreen