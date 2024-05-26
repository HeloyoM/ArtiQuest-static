import { useState, useEffect } from 'react'

type Props = {
    ttl: number
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

    const formattedTime = displayRemainingTime(remainingTimeout)

    return (
        <div>
            <h1>Remaining Time: {formattedTime}</h1>
        </div>
    )
}

export default TtlTimer