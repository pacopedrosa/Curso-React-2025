import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const {user, token} = useAuth()
    if(!user || !token){
        return <Navigate to="/login" replace/>
    }


    return children
}

export default ProtectedRoute