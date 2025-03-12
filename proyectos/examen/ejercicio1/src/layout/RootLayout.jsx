import { Outlet } from "react-router-dom"


const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet/>

      <footer className="text-center py-4">By Paco PA</footer>
    </div>

  )
}

export default RootLayout