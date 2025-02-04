import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>
        <h1>Error</h1>
        <p>La página que buscas no existe</p>
        <Link to="/">Volver al inicio</Link>
    </div>

  )
}

export default ErrorPage