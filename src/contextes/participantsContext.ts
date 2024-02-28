import { createContext } from 'react'

export const AppParticipantsContext = createContext({
	participant: null,
	switchParticipant: (_id: string) => { },
})