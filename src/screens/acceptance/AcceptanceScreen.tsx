import { Box, Typography } from '@mui/material'
import AppProgress from '../../components/common/AppProgress'
import useCategoriesTable from '../../components/categoriesTableManagement/useCategoriesTable'
import InProgressCarusel, { StepItem } from './InProgressCarusel'
import { useEffect, useState } from 'react'
import { getInprogressArtsList } from '../../api/article'
import { Article } from '../../interface/article.interface'
import { useQuery } from '@tanstack/react-query'

const AcceptanceScreen = () => {
    const [inProgressArts, setInprogressArts] = useState<StepItem[]>([])
    const { main } = useCategoriesTable()

    const { data } = useQuery({
        queryKey: ['in-progress'],
        queryFn: getInprogressArtsList,
    })

    useEffect(() => {
        if (!data) return

        const steps: StepItem[] = []

        data.map((a: Article) => {
            const { body, title } = a
            const lines = body.slice(0, 100)
            steps.push({ label: title, description: lines, author: a.author })
        })

        setInprogressArts(steps)
    }, [data])

    if (!main) return <AppProgress type="Line" />

    return (
        <Box>
            <Typography align="center">Pending articles</Typography>

            {main}

            <Box p={3}>
                <Typography align="center" sx={{ fontWeight: 'bold' }}>Coming soon - articles in progress </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center' }} m={2}>
                    {!!inProgressArts.length && <InProgressCarusel steps={inProgressArts} />}
                </Box>
            </Box>
        </Box>
    )
}

export default AcceptanceScreen

