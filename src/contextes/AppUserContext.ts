import React, { createContext } from 'react'

export default createContext({
    user: null,
    updateUserContext: (user: any) => { },
})