import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='min-h-screen bg-gray-200'><Outlet /></div>
  )
}

export default RootLayout