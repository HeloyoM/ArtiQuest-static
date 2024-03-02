import { RouterProvider } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import SessionTimeout from "./utils/SessionTimeout"
import React from "react"
import { findAllUsers } from "./api/user"
import { User } from "./interface/user.interface"
import AppUserContext from "./contextes/AppUserContext"
import useRoutes from "./utils/useRoutes"
import getDecodedUser from "./api/getDecodedUser"

function App() {
  const [crrUser, setUser] = React.useState<any>(null)

  const { isLoading, data: sysUsers } = useQuery({
    queryKey: ['users'],
    queryFn: findAllUsers
  })

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