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
import AboutAuthor from "./screens/about/AboutAuthor"
import React from "react"
import AppModal from "./components/common/modal/AppModal"
import { AppParticipantsContext } from "./contextes/participantsContext"
import { findAllUsers } from "./api/user"
import { User } from "./interface/user.interface"
import { Box, Typography } from "@mui/material"
import AppUserContext from "./contextes/AppUserContext"
import { ThemeContext } from "./contextes/ThemeContext"

function App() {
  const [participant, setParticipant] = React.useState<User | null>(null)
  const [user, setUser] = React.useState(null)
  const [theme, setTheme] = React.useState('light')

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
      element: (<AboutAuthor />)
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

  const getSelectedParticipant = (id: string) => {
    if (!id) return

    else {
      const participant = users.filter((u: User) => u.id === id)

      if (participant) return participant
    }
  }

  const closeModal = () => { setParticipant(null) }

  const participantCOM = (
    <Box sx={{ width: 850 }} role='presentation'>
      <Typography>{participant?.first_name + ' ' + participant?.last_name}</Typography>
    </Box>
  )

  const updateUserContext = (user: any) => { setUser(user) }

  const onLogginOut = () => { setUser(null) }

  const toggleTheme = () => { setTheme(theme === 'light' ? 'dark' : 'light') }
  console.log({ user })
  return (
    <React.Fragment>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {/* <AppParticipantsContext.Provider value={{ participant, switchParticipant }}> */}
        <AppUserContext.Provider value={{ updateUserContext, onLogginOut, user }}>

          <RouterProvider router={router} />
          <SessionTimeout />

        </AppUserContext.Provider>
        {/* </AppParticipantsContext.Provider> */}
        <AppModal open={participant !== null} close={closeModal} children={participantCOM} />
      </ThemeContext.Provider>
    </React.Fragment >
  )
}
export default App