const Nieto = (props) => {
  const { counter, setCounter } = props
  const handleClick = () => {
    setCounter((prevCounter)=>prevCounter + 1)
  }
  return (
    <>
    <div>Hola yo soy tu nieto</div>
    <p>El contador vale {counter}</p>
    <button
    onClick={handleClick}
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >Sumar</button>
    </>
  )
}

export default Nieto