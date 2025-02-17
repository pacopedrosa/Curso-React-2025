import { useEffect } from "react"
import { useState } from "react"

export const useFetch = (fetchFunction, dependencies = []) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = async (signal) => {
        try {
            // Reset previous data before fetching
            setData(null)
            setLoading(true)
            setError(null)

            const result = await fetchFunction(signal)
            setData(result)
        } catch (error) {
            setError(error)
            setData(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const abortController = new AbortController()
        fetchData(abortController.signal)
        return () => abortController.abort()
    }, dependencies)

    return { data, loading, error }
}