import React, { useState } from 'react'
import Employee from 'pages/Home/Employee'
import AddEmployee from './AddEmployee'

const EmployeeList = ({ employees, setEmployees, departments, maritalStatuses, resetEmployees }) => {
  const [addEmpStatus, setAddEmpStatus] = useState(false)

  return (
    <>
      <button
        onClick={() => setAddEmpStatus(!addEmpStatus)}
        className={`inline-block  text-white rounded-md transition-all px-4 py-1 mt-14 ${!addEmpStatus ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}`}
      >
        {addEmpStatus ? 'Kapat' : 'Yeni Ekle'}
      </button>
      {addEmpStatus && <AddEmployee setEmployees={setEmployees} setAddEmpStatus={setAddEmpStatus} departments={departments} maritalStatuses={maritalStatuses} />}
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
              <Employee key={index} employee={employee} setEmployees={setEmployees} departments={departments} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default EmployeeList
