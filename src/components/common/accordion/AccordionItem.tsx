import { AccordionDetails, Accordion, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

type Props = {
    label: any
    description: any
}

const AccordionItem = (props: Props) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                {props.label}
            </AccordionSummary>
            <AccordionDetails>
                {props.description}
            </AccordionDetails>
        </Accordion>
    )
}

export default AccordionItem