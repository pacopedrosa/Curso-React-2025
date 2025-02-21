import { createContext, useContext, useState } from "react";


const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider")
    }
    return context
}

const AuthProvider = ({children})=> {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(null)

    const apiUrl = import.meta.env.VITE_API_URL

    const login = async (formData) => {
        const {email, password} = formData
        try {
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            })
            if(!response.ok){
                throw new Error("Error al iniciar sesión")
            }
            const data = await response.json()
            setUser(data.user)
            setToken(data.token)
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    const register = async ({name, email, password}) => {
        try {
            const response = await fetch(`${apiUrl}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })
            if(!response.ok){
                throw new Error("Error al registrar usuario")
            }
            const data = await response.json()
            setUser(data.user)  
            setToken(data.token)
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }
    
    return (
        <authContext.Provider value={{user, error, loading, token, login, register, logout}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider;