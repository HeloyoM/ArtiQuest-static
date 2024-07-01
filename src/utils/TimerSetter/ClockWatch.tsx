import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import displayRemainingTime from '../millisecondsMinConverter'
import constants from '../system/constants'

type Props = {
    updateArtTtl: (ttl: number) => void
}
export const ClocKWatch = (props: Props) => {
    const [addingTtl, setAddingTtl] = useState(0)

    const increaseTtl = () => {
        const hlafHour = constants.HOUR_IN_MILLISECONDS / 2

        setAddingTtl(addingTtl + hlafHour)
    }

    const decreaseTtl = () => {
        if (!addingTtl) return

        const hlafHour = constants.HOUR_IN_MILLISECONDS / 2
        setAddingTtl(addingTtl - hlafHour)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <TextField
                disabled
                id="outlined-disabled"
                label={`Add ${displayRemainingTime(addingTtl)} minutes`}
                value={displayRemainingTime(addingTtl)}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box>
                    <Button onClick={increaseTtl}>+</Button>
                    <Button onClick={decreaseTtl}>-</Button>
                </Box>

                {!!addingTtl && <Button onClick={() => props.updateArtTtl(addingTtl)}>add</Button>}
            </Box>
        </Box>
    )
}