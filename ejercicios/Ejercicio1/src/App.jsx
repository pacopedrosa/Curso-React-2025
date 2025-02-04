import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import Profile from "./components/Profile.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navigation from "./components/Navigation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navigation />
        <Home />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Navigation />
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Navigation />
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
