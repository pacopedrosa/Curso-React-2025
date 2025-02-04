import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

 const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const login = () => {
        setIsAuthenticated(true)
        localStorage.setItem("isAuthenticated", true)
    }   

    const logout = () => {
        setIsAuthenticated(false)
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){throw new Error("useAuth debe estar dentro del proveedor buenas AuthProvider")}
    return context
}

