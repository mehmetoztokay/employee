import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div className='container xl mx-auto px-3'>
      <header>
        <Link to='/' className='inline-block text-blue-600 font-semibold text-3xl py-4 select-none'>
          employee
        </Link>
      </header>
      <Outlet />
    </div>
  )
}

export default HomeLayout
