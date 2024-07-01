import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import displayRemainingTime from '../millisecondsMinConverter'
import { ClocKWatch } from './ClockWatch'

type Props = {
    ttl: number
    updateArtTtl: (ttl: number) => void
}
function TtlTimer(props: Props) {
    const [initialTimeout, setInitialTimeout] = useState(props.ttl)
    const [remainingTimeout, setRemainingTimeout] = useState(props.ttl)

    useEffect(() => {
        if (props.ttl) setRemainingTimeout(props.ttl)
    }, [props.ttl])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTimeout((prevTimeout) => Math.max(prevTimeout - 1000, 0))
        }, 1000)

        return () => clearInterval(intervalId)
    }, [initialTimeout, remainingTimeout])

    const formattedTime = displayRemainingTime(remainingTimeout)

    return (
        <Box>
            <h3>
                Remaining Time for this article to publish:
                <span style={{ color: 'red' }}>{formattedTime}</span>
            </h3>

            <ClocKWatch updateArtTtl={props.updateArtTtl} />
        </Box>
    )
}

export default TtlTimer