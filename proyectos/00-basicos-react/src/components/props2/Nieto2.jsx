const Nieto2 = (props) => {
  const { handleClick, contador } = props
  return (
    <>
    <div>Hola yo soy tu nieto</div>
    <p>el contador es {contador}</p>
    <button
    onClick={handleClick}
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">sumar</button>
    </>
  )
}

export default Nieto2