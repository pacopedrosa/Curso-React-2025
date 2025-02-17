const ReviewItem = ({ review, onDelete }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-700">{review.text}</p>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(review.date).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => onDelete(review.id)}
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default ReviewItem
