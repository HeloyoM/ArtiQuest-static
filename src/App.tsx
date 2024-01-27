import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { LandPage, Login, HomePage } from './screens/index'
import ScreenContainer from "./screens/Screen"
import { Paths } from "./utils/paths"
import Category from "./components/category/Category"
import Article from "./components/article/Article"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (<ScreenContainer><LandPage /></ScreenContainer>)
    },
    {
      path: "/home",
      element: (<HomePage />)
    },
    {
      path: Paths.CAT,
      element: (<ScreenContainer><Category /></ScreenContainer>)
    },
    {
      path: Paths.ART,
      element: (<Article />)
    },

  ])

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
export default App