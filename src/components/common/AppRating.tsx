import { Rating } from '@mui/material';
import React from 'react'

type Props = {
    value: number | null | undefined
    handleRate: (val: number) => void
    readonly: boolean
}
const AppRating = (props: Props) => {
    return (
        <Rating
            name="simple-controlled"
            value={props.value}
            readOnly={props.readonly}
            onChange={(event, newValue) => {
                if(newValue)
                    props.handleRate(newValue)
            }}
        />
    )
}

export default AppRating