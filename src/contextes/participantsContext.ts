import { createContext } from 'react'

export const AppParticipantsContext = createContext({
	participant: {},
	switchParticipant: (_id: string) => { },
})