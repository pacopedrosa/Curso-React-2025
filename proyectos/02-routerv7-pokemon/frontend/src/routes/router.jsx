// importaciones

import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import { ROUTES } from "./paths";
import Home from "../pages/Home";
import Search from "../pages/Search";
import FavoritesPage from "../pages/FavoritesPage";
import PokemonDetailsPage from "../pages/PokemonDetailsPage";
import AboutPage from "../pages/AboutPage";

export const router = createBrowserRouter([
    {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
            {
                path: ROUTES.HOME,
                element: <Home />,
            },
            {
                path: ROUTES.SEARCH,
                element: <Search />,
            },
            {
                path: ROUTES.FAVORITES,
                element: <FavoritesPage />,
            },
            {
                path: ROUTES.POKEMON_DETAILS,
                element: <PokemonDetailsPage />,
                errorElement: <ErrorPage />,
                loader: async ({ params })=>{
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
                    if (!response.ok) {
                        throw new Error(`Error fetching data for ${params.name}`);
                    }
                    return await response.json();
                } //El loader permite hacer un fetch directamente en la ruta
            },
            {
                path: ROUTES.ABOUT,
                element: <AboutPage />,
            },
        ],
    },
]);