import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='container xl mx-auto py-4'>
      <div>Sayfa bulunamadı!</div>
      <Link to='/' className='inline-block bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all px-4 py-1 mt-2'>
        Ana sayfa
      </Link>
    </div>
  )
}

export default NotFound
