import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

type Props = {
    placeholder: string
    items: any[]
    onSelect: (id: string) => void
}

export default function AppDropdown(props: Props) {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" sx={{ fontWeight: 'bold' }}>{props.placeholder}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value=''
                    label={props.placeholder}
                    onChange={(e) => props.onSelect(e.target.value)}
                >
                    {props.items.map((i: any) => (
                        <MenuItem value={i}>{i}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}
