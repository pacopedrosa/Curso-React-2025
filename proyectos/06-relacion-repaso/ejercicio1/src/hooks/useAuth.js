import { useContext } from "react"
import { AuthContext } from "../context/authContext"

export const useAuth = () => {
    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider")
    }

    const {user, isAuthenticated, token, authError, login, logout, setError} = authContext

    const registerUser = async (userData) => {
        try {
            const response = await fetch("http://192.168.50.134:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })

            if (!response.ok) {
                throw new Error("Error al registrar el usuario")
            }

            const data = await response.json()
            login(data.user, data.token)
        } catch (error) {
            setError(true)
            throw error
        }
    }
    const loginUser = async (userData) => {
        try {
            const response = await fetch("http://192.168.50.134:3000/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
            })

            if (!response.ok) {
                throw new Error("Error al iniciar sesión")
            }

            const data = await response.json()
            login(data.user, data.token)
        } catch (error) {
            setError(true)
            throw error
        }
    }

    return {user, isAuthenticated, token, authError, login, logout, setError, registerUser, loginUser}
}