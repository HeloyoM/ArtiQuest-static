import { createBrowserRouter } from "react-router-dom"
import ScreenContainer from "../screens/Screen"
import { HomePage, LandPage } from "../screens"
import AboutAuthor from "../screens/about/AboutAuthor"
import { Paths } from "./paths"
import NotFoundPage from "../screens/notFound/NotFoundPage"
import Category from "../components/category/Category"
import Article from "../components/article/Article"
import Profile from "../components/common/profile/Profile"
import ControlScreen from "../screens/controlScreen/ControlScreen"
import AuthorControl from "../components/entities/author/AuthorControl"
import AcceptanceScreen from "../screens/acceptance/AcceptanceScreen"
import ArtEditor from "../components/artEditor/ArtEditor"
import ContactUs from "../screens/contactUs/ContactUs"

const useRoutes = () => {
    const router = createBrowserRouter([
        // {
        //     path: "/",
        //     element: (<ScreenContainer><LandPage /></ScreenContainer>)
        // },
        {
            path: "/",
            element: (<HomePage />)
        },
        // {
        //     path: "about",
        //     element: (<AboutAuthor />)
        // },
        {
            path: "control",
            element: (<ControlScreen />)
        },
        {
            path: "pending-articles",
            element: (<AcceptanceScreen />)
        },
        {
            path: "contact-us",
            element: (<ContactUs />)
        },
        {
            path: Paths.EDITOR,
            element: (<ScreenContainer><ArtEditor /></ScreenContainer>)
        },
        {
            path: Paths.AUTHOR,
            element: (<AuthorControl />)
        },
        {
            path: Paths.CAT,
            element: (<Category />)
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