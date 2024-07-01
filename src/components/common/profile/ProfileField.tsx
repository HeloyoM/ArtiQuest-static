import { TextField } from '@mui/material'
import { Profile } from '../../../enum/Profile.enum'
import { FormRules } from '../form/useUserForm'
import constants from '../../../utils/system/constants'
import langsFile from '../../../utils/system/langs-file.json'

type Props = {
    isEditProfile: boolean
    value?: string
    label: Profile
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    helperText?: FormRules | boolean
}

const ProfileField = (props: Props) => {
    const { isEditProfile, handleChange, label, value = '', helperText } = props

    const requiredFileds = [Profile.FIRST_NAME, Profile.LAST_NAME, Profile.EMAIL]

    const validateError = () => {
        if (typeof helperText === 'boolean') {
            if (helperText) return <ul><li>{langsFile.system.registeration.email.invalid}</li></ul>

            else return
        }

        const errorUl = []
        if (helperText?.NUM_OF_CHART) {
            errorUl.push(`${constants.PASSWORD_RULES.NUM_OF_CHART} ${langsFile.system.registeration.passwordRules.not_enough_chart} `)
        }
        if (helperText?.SPECIAL_CHART) {
            errorUl.push(`${constants.PASSWORD_RULES.SPCIAL_CHART} ${langsFile.system.registeration.passwordRules.not_special_chart}`)
        }

        if (helperText?.INTGERS) {
            errorUl.push(`${constants.PASSWORD_RULES.INTGERS} ${langsFile.system.registeration.passwordRules.not_integer}`)
        }

        if (!errorUl) return false

        else return <ul>{errorUl.map(e => <li>{e}</li>)}</ul>
    }

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
            helperText={validateError()}
        />
    )
}

export default ProfileField