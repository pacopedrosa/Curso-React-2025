import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        try {
            const userLocal = localStorage.getItem("user")
            return userLocal ? JSON.parse(userLocal) : null
        } catch (error) {
            localStorage.removeItem("user")
            return null
        }
    })
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const tokenLocal = localStorage.getItem("token")
        return !!tokenLocal
    })
    const [token, setToken] = useState(() => {
        try {
            const tokenLocal = localStorage.getItem("token")
            return tokenLocal ? JSON.parse(tokenLocal) : null
        } catch (error) {
            localStorage.removeItem("token")
            return null
        }
    })
    const [authError, setAuthError] = useState(false)

    const login = (userData, token) => {
        setUser(userData)
        setToken(token)
        setIsAuthenticated(true)

        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", JSON.stringify(token))

        setAuthError(false)
    }

    const setError = (error) => {
        setAuthError(error)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        setIsAuthenticated(false)

        localStorage.removeItem("user")
        localStorage.removeItem("token")

        setAuthError(false)
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, token, authError, login, logout, setError}}>
            {children}
        </AuthContext.Provider>
    )
}

