import React from 'react'
import Employee from 'pages/Home/Employee'

const EmployeeList = () => {
  return (
    <>
      <div className='flex min-w-full shadow-md rounded-lg overflow-x-auto mt-16'>
        <table className='min-w-full leading-normal '>
          <thead>
            <tr className='bg-gray-100 text-left'>
              <th className='text-xs font-semibold text-gray-700 tracking-wider pr-5 py-3 pl-7'>Ad Soyad</th>
              <th className='text-xs font-semibold text-gray-700 tracking-wider pr-5 py-3 pl-7'>E Mail</th>
              <th colSpan={3} className='text-left text-xs font-semibold text-gray-700 tracking-wider pr-5 py-3 pl-7'>
                Departman
              </th>
            </tr>
          </thead>
          <tbody>
            <Employee />
          </tbody>
        </table>
      </div>
    </>
  )
}

export default EmployeeList
