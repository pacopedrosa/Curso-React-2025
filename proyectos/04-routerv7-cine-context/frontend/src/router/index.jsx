import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';
import MovieList from '../pages/MovieList';
import MovieDetail from '../pages/MovieDetail';
import Search from '../pages/Search';
import Reviews from '../pages/Reviews';
import Favorites from '../pages/Favorites';
import ErrorPage from '../pages/ErrorPage';
import PrivateRoute from '../components/PrivateRoute';
import Login from '../pages/Login';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'movies',
                element: <MovieList />
            },
            {
                path: 'movie/:id',
                element: <MovieDetail />
            },
            {
                path: 'search',
                element: <Search />
            },
            {
                path: 'reviews',
                element: <PrivateRoute><Reviews /></PrivateRoute>
            },
            {
                path: 'favorites',
                element: <PrivateRoute><Favorites /></PrivateRoute>
            },
            {
                path: 'login',
                element: <Login />
            }
        ]
    }
]);