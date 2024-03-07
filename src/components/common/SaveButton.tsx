import { Button } from '@mui/material'
import langsFile from '../../utils/langs-file.json'

type Props = {
    handleSave: () => void
    disabled?: boolean
}
const SaveButton = (props: Props) => {
    const { disabled = false, handleSave } = props
    return (
        <Button
            variant='outlined'
            color='success'
            onClick={handleSave}
            disabled={disabled}>
            {langsFile.system.common.save}
        </Button>
    )
}

export default SaveButton