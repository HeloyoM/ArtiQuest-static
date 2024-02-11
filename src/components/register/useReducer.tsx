import { FormFields } from "./form.enum"

export type FormState = {
    email: string
    phone_number: string,
    firstName: string,
    lastName: string
    password: string
}

export const reducer = (state: FormState, action: any) => {
    switch (action.type) {
        case FormFields.set_password: {
            return { ...state, password: action.password }
        }
        case FormFields.set_email: {
            return { ...state, email: action.email }
        }
        case FormFields.set_first_name: {
            return { ...state, firstName: action.firstName }
        }

        case FormFields.set_last_name: {
            return { ...state, lastName: action.lastName }
        }

        case FormFields.set_phone_number: {
            return { ...state, phoneNumber: action.phoneNumber }
        }

        default:
            return state
    }
}