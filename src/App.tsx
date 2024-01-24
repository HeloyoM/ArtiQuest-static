import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { LandPage, Login, HomePage } from './screens/index'
import ScreenContainer from "./screens/Screen"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (<ScreenContainer><LandPage /></ScreenContainer>)
    },
    {
      path: "login",
      element: (<ScreenContainer><Login /></ScreenContainer>)
    },
    {
      path: "/home",
      element: (<HomePage />)
    },
  ])
  return (
    <RouterProvider router={router} />
  )
}
export default App