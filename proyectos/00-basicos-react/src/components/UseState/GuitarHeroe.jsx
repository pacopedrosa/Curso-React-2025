import { useState } from 'react';
import CardGuitar from './cardGuitar';

const GuitarHeroe = () => {
    const initialGuitars = [
        {
            id: 1,
            nombre: "Taylor 314ce",
            precio: 1299.99,
            imagen: "https://r2.gear4music.com/media/44/449051/600/preview.jpg",
            tipo: "Eléctrica"
        },
        {
            id: 8,
            nombre: "Gibson J-45",
            precio: 2199.99,
            imagen: "https://r2.gear4music.com/media/44/449051/600/preview.jpg",
            tipo: "Acústica"
        },
        {
            id: 9,
            nombre: "Fender CD-60S",
            precio: 199.99,
            imagen: "https://r2.gear4music.com/media/44/449051/600/preview.jpg",
            tipo: "Acústica"
        },
        {
            id: 10,
            nombre: "Takamine GD30CE",
            precio: 499.99,
            imagen: "https://r2.gear4music.com/media/44/449051/600/preview.jpg",
            tipo: "Acústica"
        }
    ];

    const [filterGuitars, setFilterGuitars] = useState(initialGuitars);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        findGuitars(value, filterType);
    };

    const handleFilterType = (e) => {
        const value = e.target.value;
        setFilterType(value);
        findGuitars(searchTerm, value);
    };

    const findGuitars = (search, type) => {
        let filtered = initialGuitars.filter(guitar =>
            guitar.nombre.toLowerCase().includes(search) &&
            (type === "" || guitar.tipo === type)
        );
        setFilterGuitars(filtered);
    };

    return (
        <>
            <div className='max-w-2xl mx-auto bg-gray-200 mt-8 p-6 shadow-lg rounded-md'>
                {/* Titulo */}
                <h1 className='text-2xl font-bold text-center mb-6'>Filtro de guitarras</h1>

                {/* Buscador */}
                <div>
                    <label className='block text-gray-700 font-medium'>Buscar</label>
                    <input type='text'
                        placeholder='Buscar guitarra'
                        value={searchTerm}
                        onChange={handleSearch}
                        className='w-full p-2 border border-gray-300 rounded-md'
                    />
                </div>

                {/* Filtro por tipo */}
                <div className='mt-4'>
                    <label className='block text-gray-700 font-medium'>Tipo</label>
                    <select value={filterType} onChange={handleFilterType} className='w-full p-2 border border-gray-300 rounded-md'>
                        <option value=''>Todas</option>
                        <option value='Eléctrica'>Eléctrica</option>
                        <option value='Acústica'>Acústica</option>
                    </select>
                </div>

                {/* Lista de guitarras */}
                <ul className='grid grid-cols-2 gap-4 mt-6'>
                    {filterGuitars.map((guitar) => (
                        <li key={guitar.id}>
                            <CardGuitar guitar={guitar} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default GuitarHeroe;