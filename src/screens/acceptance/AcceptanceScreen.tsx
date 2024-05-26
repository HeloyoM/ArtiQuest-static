import { Box, Typography } from '@mui/material'
import AppProgress from '../../components/common/AppProgress'
import useCategoriesTable from '../../components/categoriesTableManagement/useCategoriesTable'
import InProgressCarusel from './InProgressCarusel'
import { useEffect, useState } from 'react'
import { getInprogressArtsList } from '../../api/article'
import { Article } from '../../interface/article.interface'
import { useQuery } from '@tanstack/react-query'
import { StepItem } from './StepItem.interface'
import TtlTimer from './TtlTimer'

const AcceptanceScreen = () => {
    const [inProgressArts, setInprogressArts] = useState<StepItem[]>([])
    const [ttl, setTtl] = useState(0)

    const { main } = useCategoriesTable()

    const { data } = useQuery({
        queryKey: ['in-progress'],
        queryFn: getInprogressArtsList,
    })

    useEffect(() => {
        if (!data) return

        const steps: StepItem[] = []

        setTtl(data.ttl)

        data.storedInprogressArticles.map((a: Article) => {
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
                <Typography><TtlTimer  ttl={ttl}/></Typography>
                <Typography align="center" sx={{ fontWeight: 'bold' }}>Coming soon - articles in progress </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center' }} m={2}>
                    {!!inProgressArts.length && <InProgressCarusel steps={inProgressArts} />}
                </Box>
            </Box>
        </Box>
    )
}

export default AcceptanceScreen

function displayRemainingTime(timeoutInMilliseconds: number) {
    // Ensure timeout is positive
    if (timeoutInMilliseconds <= 0) {
        return "00:00";
    }

    // Convert milliseconds to minutes and seconds
    const minutes = Math.floor(timeoutInMilliseconds / (1000 * 60));
    const seconds = Math.floor((timeoutInMilliseconds % (1000 * 60)) / 1000);

    // Format minutes and seconds with leading zeros
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}