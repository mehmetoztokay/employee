import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <>
      <header className='container xl mx-auto'>
        <Link to='/' className='inline-block text-blue-600 font-semibold text-3xl py-4 select-none'>
          employee
        </Link>
      </header>
      <Outlet />
    </>
  )
}

export default HomeLayout
