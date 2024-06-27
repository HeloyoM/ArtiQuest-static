import { Box, Button, Input } from '@mui/material'
import { useState, useEffect } from 'react'

type Props = {
    ttl: number
}
function TtlTimer(props: Props) {
    const [initialTimeout, setInitialTimeout] = useState(props.ttl)
    const [remainingTimeout, setRemainingTimeout] = useState(props.ttl)
    const [addingTtl, setAddingTtl] = useState(0)

    useEffect(() => {
        if (props.ttl) setRemainingTimeout(props.ttl)
    }, [props.ttl])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTimeout((prevTimeout) => Math.max(prevTimeout - 1000, 0))
        }, 1000)

        return () => clearInterval(intervalId)
    }, [initialTimeout, remainingTimeout])

    const displayRemainingTime = (timeoutInMilliseconds: number) => {
        if (timeoutInMilliseconds <= 0) {
            return "00:00"
        }
        const minutes = Math.floor(timeoutInMilliseconds / (1000 * 60))
        const seconds = Math.floor((timeoutInMilliseconds % (1000 * 60)) / 1000)

        const formattedMinutes = minutes.toString().padStart(2, "0")
        const formattedSeconds = seconds.toString().padStart(2, "0")

        return `${formattedMinutes}:${formattedSeconds}`
    }


    const increaseTtl = () => {
        setAddingTtl(prev => prev + 1_800_000)
    }

    const decreaseTtl = () => {
        if (!addingTtl) return

        setAddingTtl(prev => prev - 1_800_000)
    }

    const formattedTime = displayRemainingTime(remainingTimeout)

    return (
        <Box>
            <h3>Remaining Time for this article to publish: <span style={{ color: 'red' }}>{formattedTime}</span></h3>

            <Box>
                <Input value={addingTtl} disabled />

                <Button onClick={increaseTtl}>+</Button>
                <Button onClick={decreaseTtl}>-</Button>
            </Box>
        </Box>
    )
}

export default TtlTimer