import { TextField } from '@mui/material'
import { Profile } from '../../../enum/Profile.enum'

type Props = {
    isEditProfile: boolean
    value: string
    label: Profile
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ProfileField = (props: Props) => {
    const { isEditProfile, handleChange, label, value } = props

    const requiredFileds = [Profile.FIRST_NAME, Profile.LAST_NAME, Profile.EMAIL]

    return (
        <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            id="standard-read-only-input"
            label={label}
            name={label}
            required={isEditProfile && requiredFileds.includes(label)}
            variant={isEditProfile ? 'outlined' : 'standard'}
            defaultValue={value}
            InputProps={{
                readOnly: isEditProfile ? false : true,
            }}
        />
    )
}

export default ProfileField