import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ToastProvider } from './contexts/ToastContext';
import { ReviewsProvider } from './contexts/ReviewsContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';
import Reviews from './pages/Reviews';
import Profile from './pages/Profile';

const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <FavoritesProvider>
            <ReviewsProvider>
              <div className="min-h-screen bg-gray-100">
                <Navbar />
                <main className="container mx-auto py-4">
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<MovieList />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path="/favorites" element={
                      <PrivateRoute>
                        <Favorites />
                      </PrivateRoute>
                    } />
                    <Route path="/my-reviews" element={
                      <PrivateRoute>
                        <Reviews />
                      </PrivateRoute>
                    } />
                    <Route path="/profile" element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    } />
                  </Routes>
                </main>
              </div>
            </ReviewsProvider>
          </FavoritesProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;