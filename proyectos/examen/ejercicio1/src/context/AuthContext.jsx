import { createContext, useState } from "react";


const authContext = createContext()

const AuthProvider = ()=> {
    const [user, setUser] = useState(null)
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(true)
    const [token, setToken] = useState(null)

}

export default authContext;