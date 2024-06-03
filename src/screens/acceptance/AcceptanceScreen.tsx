import { Box, Typography } from '@mui/material'
import AppProgress from '../../components/common/AppProgress'
import useCategoriesTable from '../../components/categoriesTableManagement/useCategoriesTable'
import InProgressCarusel from './InProgressCarusel'
import { useEffect, useState } from 'react'
import { getAllInprogressArts, getInprogressArtsByAuthorId } from '../../api/article'
import { Article } from '../../interface/article.interface'
import { useQuery } from '@tanstack/react-query'
import { StepItem } from './StepItem.interface'

const AcceptanceScreen = () => {
    const [inProgressArts, setInprogressArts] = useState<StepItem[]>([])

    const { main } = useCategoriesTable()

    const { data } = useQuery({
        queryKey: ['in-progress'],
        queryFn: getAllInprogressArts,
    })

    useEffect(() => {
        if (!data) return

        const steps: StepItem[] = []

        data.map((a: Article) => {
            const { body, title } = a
            const lines = body.slice(0, 100)
            steps.push({ label: title, description: lines, author: a.author, ttl: a.ttl })
        })

        setInprogressArts(steps)
    }, [data])

    if (!main) return <AppProgress type="Line" />

    return (
        <Box>
            <Typography align="center">Pending articles</Typography>

            {main}

            {!!inProgressArts.length && <Box p={3}>
                <Typography align="center" sx={{ fontWeight: 'bold' }}>Coming soon - articles in progress </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center' }} m={2}>
                    <InProgressCarusel steps={inProgressArts} />
                </Box>
            </Box>}
        </Box>
    )
}

export default AcceptanceScreen