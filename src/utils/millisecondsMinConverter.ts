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

export default displayRemainingTime