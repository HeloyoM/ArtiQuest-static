import { Accordion } from '@mui/material'
import React from 'react'

type Props = {
    summaries: any[]
}

export default function AppAccordion(props: Props) {
    return (
        <React.Fragment>
            {props.summaries.map((i: JSX.Element) => (
                <Accordion>
                    {i}
                </Accordion>
            ))}
        </React.Fragment>
    )
}