import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { FavoritesProvider } from "./contexts/FavoritesContext"
import { ReviewsProvider } from "./contexts/ReviewsContext"
import { ToastProvider } from "./contexts/ToastContext"

const App = () => {
  return (
    <ToastProvider>
      <ReviewsProvider>
        <FavoritesProvider>
          <div className="min-h-screen flex flex-col">
            <RouterProvider router={router} />
          </div>
        </FavoritesProvider>
      </ReviewsProvider>
    </ToastProvider>
  )
}

export default App