import { createBrowserRouter } from "react-router-dom"
import ScreenContainer from "../screens/Screen"
import { HomePage, LandPage } from "../screens"
import AboutAuthor from "../screens/about/AboutAuthor"
import { Paths } from "./paths"
import NotFoundPage from "../screens/notFound/NotFoundPage"
import Category from "../components/category/Category"
import Article from "../components/article/Article"
import Profile from "../components/common/profile/Profile"

const useRoutes = () => {
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
            path: Paths.PROFILE,
            element: (<ScreenContainer><Profile /></ScreenContainer>)
        },
        {
            path: Paths.NOT_FOUND,
            element: (<NotFoundPage />)
        },
    ])

    return { router }
}

export default useRoutes