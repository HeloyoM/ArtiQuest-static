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
import { findAllUsers } from "./api/user"
import { User } from "./interface/user.interface"
import { Box, Typography } from "@mui/material"
import AppUserContext from "./contextes/AppUserContext"
import { ThemeContext } from "./contextes/ThemeContext"
import getToken from "./api/getToken"
import { jwtDecode } from "jwt-decode"
import useRoutes from "./utils/useRoutes"

function App() {
  const [crrUser, setUser] = React.useState(null)

  const { isLoading, data: sysUsers } = useQuery({
    queryKey: ['users'],
    queryFn: findAllUsers
  })

  React.useEffect(() => {
    const token = getToken()


    if (token && sysUsers) {
      const userInfo = jwtDecode(token)


      const userObj = sysUsers.find((u: User) => u.id?.toString() === userInfo.sub?.toString())


      updateUserContext(userObj)

    }

  }, [sysUsers])

  const { router } = useRoutes()

  const updateUserContext = (user: any) => { setUser(user) }

  return (
    <React.Fragment>
      <AppUserContext.Provider value={{ updateUserContext, user: crrUser }}>

        <RouterProvider router={router} />
        <SessionTimeout />

      </AppUserContext.Provider>
    </React.Fragment >
  )
}
export default App