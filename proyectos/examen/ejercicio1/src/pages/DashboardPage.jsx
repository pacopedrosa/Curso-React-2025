import { useDashboardStats } from '../hooks/useDashboardStats'

export const DashboardPage = () => {
    const { totalProducts, totalInventoryValue, lowStockProducts } = useDashboardStats()

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Tarjeta de Total de Productos */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-700">Total Productos</h2>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{totalProducts}</p>
                </div>

                {/* Tarjeta de Valor del Inventario */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-700">Valor del Inventario</h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                        ${totalInventoryValue.toFixed(2)}
                    </p>
                </div>

                {/* Tarjeta de Productos con Bajo Stock */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-700">Productos Bajo Stock</h2>
                    <p className="text-3xl font-bold text-red-600 mt-2">
                        {lowStockProducts.length}
                    </p>
                </div>
            </div>

            {/* Lista de Productos con Bajo Stock */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Productos con Stock Bajo
                </h2>
                <div className="space-y-4">
                    {lowStockProducts.map(product => (
                        <div key={product._id} className="border-b pb-2">
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-gray-600">
                                Stock actual: <span className="text-red-600 font-semibold">{product.stock}</span> unidades
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}