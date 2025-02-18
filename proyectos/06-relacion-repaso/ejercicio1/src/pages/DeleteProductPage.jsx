import { useParams } from 'react-router-dom'
const DeleteProductPage = () => {
    const {id} = useParams() // Para sacar el id de el get de la url

  return (
    <div>DeleteProductPage {id}</div>
  )
}

export default DeleteProductPage