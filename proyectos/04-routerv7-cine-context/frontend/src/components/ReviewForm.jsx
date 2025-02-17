import { useState } from 'react'

const ReviewForm = ({ onSubmit }) => {
  const [review, setReview] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!review.trim()) return
    
    onSubmit(review)
    setReview('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea 
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        rows="4"
        placeholder="Escribe tu comentario aquí..."
      />
      <button 
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Enviar comentario
      </button>
    </form>
  )
}

export default ReviewForm
