import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { LandPage, HomePage } from './screens/index'
import ScreenContainer from "./screens/Screen"
import { Paths } from "./utils/paths"
import Category from "./components/category/Category"
import Article from "./components/article/Article"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import NotFoundPage from "./screens/notFound/NotFoundPage"
import SessionTimeout from "./utils/SessionTimeout"
import AboutAuther from "./screens/about/AboutAuther"

function App() {

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

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <SessionTimeout />
    </QueryClientProvider>
  )
}
export default App