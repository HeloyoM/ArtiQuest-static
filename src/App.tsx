import './App.css'
import LandPage from './screens/langPage/LandPage';
import ScreenContainer from './screens/Screen'
import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandPage />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

function App() {
  return (
    <div className="App">
      <ScreenContainer>
        <RouterProvider router={router} />
      </ScreenContainer>
    </div>
  )
}

export default App