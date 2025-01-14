import PropTypes from 'prop-types';

const CardGuitar = ({ guitar }) => {
    const { id, nombre, imagen, precio, tipo } = guitar;
    return (
        <>
            <li key={id} className='bg-white p-4 shadow-md rounded-md'>
                <img src={imagen} alt={nombre} className='w-full h-32 object-cover mb-4' />
                <h2 className='text-lg font-bold'>{nombre}</h2>
                <p className='text-sm text-gray-500'>{tipo}</p>
                <p className='text-lg font-bold'>${precio}</p>
            </li>
        </>
    );
};

//Buscado en chatgpt para que no de el error, pero no es del todo un error es como un aviso refiriendose a los props
//los cuales tambien se pueden hacer en los json

CardGuitar.propTypes = {
    guitar: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombre: PropTypes.string.isRequired,
        imagen: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
        tipo: PropTypes.string.isRequired
    }).isRequired
};

export default CardGuitar;