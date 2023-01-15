import React from 'react'
import Employee from 'pages/Home/Employee'

const EmployeeList = ({ employees, setEmployees, resetEmployees }) => {
  return (
    <>
      <div className='flex min-w-full shadow-md rounded-lg overflow-x-auto mt-4'>
        <table className='min-w-full leading-normal '>
          <thead>
            <tr className='bg-gray-100 text-left'>
              <th className='text-xs font-semibold text-gray-700 tracking-wider whitespace-nowrap pr-5 py-3 pl-7 '>Ad Soyad</th>
              <th className='text-xs font-semibold text-gray-700 tracking-wider whitespace-nowrap pr-5 py-3 pl-7'>E Mail</th>
              <th className='text-xs font-semibold text-gray-700 tracking-wider whitespace-nowrap pr-5 py-3 pl-7'>Medeni Durum</th>
              <th colSpan={2} className='text-left text-xs font-semibold text-gray-700 tracking-wider whitespace-nowrap pr-5 py-3 pl-7'>
                Departman
              </th>
            </tr>
          </thead>
          <tbody>
            {!employees.length ? (
              <tr>
                <td colSpan={5} className='text-center py-6'>
                  <p>Herhangi bir sonuç bulunamadı...</p>
                  <small className='text-blue-500 mt-1'>
                    <button onClick={resetEmployees}>Çalışanları tekrar listelemek için tıklayın</button>
                  </small>
                </td>
              </tr>
            ) : null}
            {employees.map((employee, index) => (
              <Employee key={index} employee={employee} setEmployees={setEmployees} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default EmployeeList
