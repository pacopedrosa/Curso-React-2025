import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import RootLayout from "../layout/RootLayout";
import Favorites from "../pages/Favorites";
import Search from "../pages/Search";
import PokemonDetail from "../pages/PokemonDetail";
import About from "../pages/About";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                path: "/",
                element: <Home />
            },
            {
                path: "favorites",
                element: <Favorites />
            },
            {
                path: "search",
                element: <Search />
            },
            {
                path: "pokemon/:name",
                element: <PokemonDetail />,
                loader: async ({ params }) => {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
                    if(!response.ok) {
                        throw new Error("Failed to fetch pokemon")
                    }
                    const data = await response.json()
                    return data
                }
            },
            {
                path: "about",
                element: <About />
            }
        ]
    }
])

