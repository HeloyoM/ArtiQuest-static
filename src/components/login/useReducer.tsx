export enum ActionTypes {
    set_email = 'email',
    set_password = 'password',
    set_first_name = 'first_name',
    set_last_name = 'last_name',
    set_phone_number = 'phone_number',
}

export enum FormType {
    login = 'LOGIN',
    change_password = 'CHANGE_PASSWORD',
}

export type FormState = {
    type: FormType | null
    email: string
    phoneNumber: string,
    firstName: string,
    lastName: string
    password: string
}

export type FormErrors = {
    email?: string
    password?: string
    newPassword?: string
}

export const reducer = (state: FormState, action: any) => {
    switch (action.type) {
        case ActionTypes.set_password: {
            return { ...state, type: FormType.change_password }
        }
        case ActionTypes.set_email: {
            return { ...state, email: action.email }
        }
        case ActionTypes.set_first_name: {
            return { ...state, firstName: action.firstName }
        }

        case ActionTypes.set_last_name: {
            return { ...state, lastName: action.lastName }
        }

        case ActionTypes.set_phone_number: {
            return { ...state, phoneNumber: action.phoneNumber }
        }

        default:
            return state
    }
}