import Nieto from "./Nieto"

const Hijo = (props) => {
  const { counter, setCounter } = props
  const handleClick = () => {
    setCounter((prevCounter)=>prevCounter + 1)
  }
  return (
    <>
    <div>Yo soy tu Hijo</div>
    <p>El contador vale {counter}</p>
    <button
    onClick={handleClick}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >Sumar</button>
    <Nieto counter={counter} setCounter={setCounter} />
    </>
  )
}

export default Hijo