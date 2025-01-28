import { useState } from 'react'
import Navbar from './Navbar'
import NavUser from './NavUser'
import Main from './Main'

const GestUser = () => {
  const [users, setUsers] = useState([])

  return (
    <div className="min-h-screen bg-gray-100">
      <NavUser />
      <Navbar />
      <Main users={users} setUsers={setUsers} />
    </div>
  )
}

export default GestUser
