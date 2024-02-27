import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { LandPage, HomePage } from './screens/index'
import ScreenContainer from "./screens/Screen"
import { Paths } from "./utils/paths"
import Category from "./components/category/Category"
import Article from "./components/article/Article"
import { QueryClientProvider, QueryClient, useQuery } from '@tanstack/react-query'
import NotFoundPage from "./screens/notFound/NotFoundPage"
import SessionTimeout from "./utils/SessionTimeout"
import AboutAuther from "./screens/about/AboutAuther"
import React from "react"
import AppModal from "./components/common/modal/AppModal"
import { AppParticipantsContext } from "./contextes/participantsContext"
import { findAllUsers } from "./api/user"
import { User } from "./interface/user.interface"
import { Box, Typography } from "@mui/material"

function App() {
  const [participant, setParticipant] = React.useState<User | null>(null)

  const { isLoading, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: findAllUsers
  })

  const router = createBrowserRouter([
    {
      path: "/",
      element: (<ScreenContainer><LandPage /></ScreenContainer>)
    },
    {
      path: "home",
      element: (<HomePage />)
    },
    {
      path: "about",
      element: (<AboutAuther />)
    },
    {
      path: Paths.CAT,
      element: (<ScreenContainer><Category /></ScreenContainer>)
    },
    {
      path: Paths.ART,
      element: (<Article />)
    },
    {
      path: Paths.NOT_FOUND,
      element: (<NotFoundPage />)
    },

  ])


  const switchParticipant = (_id: string) => setParticipant(getSelectedParticipant(_id))

  const getSelectedParticipant = (_id: string) => {
    if (!_id) return

    else {
      const participant = users.filter((u: User) => u.id === _id)

      if (participant) return participant
    }
  }

  const closeModal = () => { setParticipant(null) }

  const participantCOM = (
    <Box sx={{ width: 850 }} role='presentation'>
      <Typography>{participant?.first_name + ' ' + participant?.last_name}</Typography>
    </Box>
  )

  return (
    <React.Fragment>
      <AppParticipantsContext.Provider value={{ participant: {}, switchParticipant }}>

        <RouterProvider router={router} />
        <SessionTimeout />

      </AppParticipantsContext.Provider >
      <AppModal open={participant !== null} close={closeModal} children={participantCOM} />
    </React.Fragment>
  )
}
export default App