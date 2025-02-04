import React from 'react'

export const Spinner = () => {
  return (
    <div>
        <div className='flex justify-center items-center h-screen'>
            <div className='w-12 h-12 rounded-full animate-spin absolute border-4 border-pink-500 border-t-transparent'></div>
        </div>
    </div>

  )
}

export default Spinner