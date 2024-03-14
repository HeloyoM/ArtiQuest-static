import React from "react"
import { RouterProvider } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'

import AppUserContext from "./contextes/AppUserContext"

import SessionTimeout from "./utils/SessionTimeout"
import { findAllUsers } from "./api/user"
import useQueries from "./components/register/useQueries"

import useRoutes from "./utils/useRoutes"
import getDecodedUser, { getToken } from "./api/getDecodedUser"

import { User } from "./interface/user.interface"

function App() {
  const [crrUser, setUser] = React.useState<any>(null)

  const { data: sysUsers } = useQuery({
    queryKey: ['users'],
    queryFn: findAllUsers
  })

  const { refrshTokenMutate } = useQueries({})

  React.useEffect(() => {
    if (getDecodedUser())
      refrshTokenMutate.mutate()
  }, [])

  React.useEffect(() => {
    const decodedUser = getDecodedUser()

    if (decodedUser && sysUsers) {

      const userObj = sysUsers.find((u: User) => u.id === decodedUser.sub)

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