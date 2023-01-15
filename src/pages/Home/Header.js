import React from 'react'
import SearchIcon from 'assets/icons/search.svg'

const Header = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex items-center'>
        <h2 className='font-semibold mr-8'>Çalışan Listesi</h2>
        <form>
          <div className='relative'>
            <input type='text' placeholder='Çalışan ara' className='outline-1 outline-blue-600 border border-gray-300 rounded-md py-1 px-2' />
            <button type='submit'>
              <picture width={15} height={15} className='absolute right-3 top-1/2 -translate-y-1/2'>
                <img src={SearchIcon} alt='' />
              </picture>
            </button>
          </div>
        </form>
      </div>
      <button className='bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all px-4 py-1'>Ekle</button>
    </div>
  )
}

export default Header
