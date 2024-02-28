import { Rating } from '@mui/material';
import React from 'react'

type Props = {
    value: number | null | undefined
    setRate?: (rate: number | null) => void
    readonly: boolean
}
const AppRating = (props: Props) => {
    return (
        <Rating
            name="simple-controlled"
            value={props.value}
            readOnly={props.readonly}
            onChange={(event, newValue) => {
                props.setRate!(newValue)
            }}
        //readOnly 
        />
    )
}

export default AppRating