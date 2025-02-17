import { useContext, useState } from "react"
import { createContext } from "react"

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const checkAuth = async () => {
        try {
            const response = await fetch(`${VITE_BACKEND_URL}/auth/check-auth`, {
                credentials: 'include'
            })
            if(!response.ok) {
                throw new Error('No se pudo verificar la autenticación')
            }
            setIsAuthenticated(true)
            return true
        } catch (error) {
            console.error('Error al verificar la autenticación:', error)
            return false
        }
    }   

    const login = async (username, password) => {
        try {
            const response = await fetch(`${VITE_BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            })
            if(!response.ok) {
                throw new Error('Login failed')
            }
            setIsAuthenticated(true)
        } catch (error) {
            console.error('Login failed:', error)
        }
    }


    const logout = async () => {
        try {
            const response = await fetch(`${VITE_BACKEND_URL}/auth/logout`, {
                credentials: 'include'
            })
            if(!response.ok) {
                throw new Error('Logout failed')
            }
            setIsAuthenticated(false)
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, checkAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}