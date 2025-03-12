import { useState, useEffect } from 'react'
import { useProducts } from '../context/ProductContext'

export const useDashboardStats = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalInventoryValue: 0,
        lowStockProducts: []
    })

    const { products } = useProducts()

    useEffect(() => {
        if (products) {
            const totalProducts = products.length
            const totalInventoryValue = products.reduce((total, product) => {
                return total + (product.price * product.stock)
            }, 0)
            const lowStockProducts = products.filter(product => product.stock < 10)

            setStats({
                totalProducts,
                totalInventoryValue,
                lowStockProducts
            })
        }
    }, [products])

    return stats
}