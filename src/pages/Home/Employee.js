import axios from 'axios'
import React, { useEffect, useState } from 'react'

import InputSelect from 'components/Selects/InputSelect'

const Employee = ({ employee, setEmployees, departments, maritalStatuses }) => {
  const [employeeState, setEmployeeState] = useState(false)
  const [employeeEditing, setEmployeeEditing] = useState(false)
  const [employeeSetted, setEmployeeSetted] = useState({ ...employee })

  useEffect(() => {
    setEmployeeSetted(employee)
  }, [employee])

  const editEmployeeState = () => {
    setEmployeeState(!employeeState)
  }

  const editEmployee = async () => {
    // Setting state of spinner
    setEmployeeEditing(true)

    await axios
      .put(`/employees/${employee?.id}`, { ...employeeSetted })
      .then((response) => {
        if (response.status === 200) {
          // Setting values of view
          setEmployees((prevEmployees) => prevEmployees.map((prevEmployee) => (prevEmployee.id === employee.id ? { ...prevEmployee, ...employeeSetted } : prevEmployee)))

          // Setting state of spinner and editable inputs
          setEmployeeState(false)
          setEmployeeEditing(false)
        } else setEmployeeEditing(false)
      })
      .catch((error) => {
        console.log(error)
        // Setting state of spinner and editable inputs
        setEmployeeState(false)
        setEmployeeEditing(false)
      })
  }

  const deleteEmployee = async () => {
    setEmployeeEditing(true)

    const deleteConfirm = window.confirm(`${employee.fullname} adlı kişiyi silmek istedigine emin misin?`)

    if (deleteConfirm) {
      await axios
        .delete(`/employees/${employee?.id}`)
        .then((response) => {
          if (response.status === 200) {
            setEmployees((prevEmployees) => prevEmployees.filter((prevEmployee) => prevEmployee.id !== employee.id))
            setEmployeeEditing(false)
          }
        })
        .catch((error) => {
          console.log(error)
          setEmployeeEditing(false)
        })
    } else {
      setEmployeeEditing(false)
    }
  }

  return (
    <tr className='border-gray-200 border-t hover:bg-gray-50 transition-colors'>
      <td className='lg:px-5 lg:py-5 text-sm px-2 py-2 '>
        {!employeeState ? (
          <p className='text-gray-800 whitespace-nowrap pl-2'>{employee.fullname}</p>
        ) : (
          <input
            type='text'
            className='w-full text-gray-800 whitespace-nowrap outline-1 outline-blue-600 border border-gray-300 rounded-md p-2'
            value={employeeSetted.fullname}
            onChange={(e) => {
              setEmployeeSetted({ ...employeeSetted, fullname: e.target.value })
            }}
          />
        )}
      </td>
      <td className='text-sm lg:px-5 lg:py-5 px-2 py-2'>
        {!employeeState ? (
          <p className='text-gray-900 whitespace-nowrap pl-2'>{employee.email}</p>
        ) : (
          <input
            type='text'
            className='w-full text-gray-800 whitespace-nowrap outline-1 outline-blue-600 border border-gray-300 rounded-md p-2'
            value={employeeSetted.email}
            onChange={(e) => {
              setEmployeeSetted({ ...employeeSetted, email: e.target.value })
            }}
          />
        )}
      </td>
      <td className='text-sm lg:px-5 lg:py-5 px-2 py-2'>
        {!employeeState ? (
          <p className='text-gray-900 whitespace-nowrap pl-2'>{employee.maritalStatus ? 'Evli' : 'Bekâr'}</p>
        ) : (
          <InputSelect
            options={maritalStatuses.map((maritalStatus) => ({ ...maritalStatus, label: maritalStatus.title }))}
            defaultValue={{
              label: maritalStatuses.find((maritalStatus) => maritalStatus.state === employee.maritalStatus)?.title,
              value: maritalStatuses.find((maritalStatus) => maritalStatus.state === employee.maritalStatus)?.state
            }}
            onChange={(option) => {
              setEmployeeSetted((prevEmployeeSetted) => ({ ...prevEmployeeSetted, maritalStatus: option.state }))
            }}
          />
        )}
      </td>
      <td className='lg:px-5 lg:py-5 px-2 py-2 text-sm'>
        {!employeeState ? (
          <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
            <span aria-hidden className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
            <span className='relative whitespace-nowrap'>{departments.find((department) => department.id === employee.departmentId)?.title}</span>
          </span>
        ) : (
          <InputSelect
            options={departments.map((department) => ({ ...department, label: department.title }))}
            defaultValue={{
              label: departments.find((department) => department.id === employee.departmentId)?.title,
              value: departments.find((department) => department.id === employee.departmentId)?.id
            }}
            onChange={(option) => {
              setEmployeeSetted((prevEmployeeSetted) => ({ ...prevEmployeeSetted, departmentId: option.id }))
            }}
          />
          // <input
          //   type='text'
          //   className='w-full text-gray-800 whitespace-nowrap outline-1 outline-blue-600 border border-gray-300 rounded-md p-2'
          //   value={employeeSetted.departmentId}
          //   onChange={(e) => {
          //     setEmployeeSetted({ ...employeeSetted, departmentId: e.target.value })
          //   }}
          // />
        )}
      </td>
      <td className='flex justify-end items-center text-sm lg:px-5 lg:py-5 px-2 py-2'>
        <div>
          {employeeState ? (
            <button
              onClick={editEmployee}
              type='button'
              className='flex items-center bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all px-4 py-1'
              title='Tamamla'
              disabled={employeeEditing ? 'disabled' : ''}
            >
              <div className={employeeEditing ? '' : 'hidden'}>
                <svg
                  aria-hidden='true'
                  className='w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
              </div>
              <span>Tamamla</span>
            </button>
          ) : (
            <button
              onClick={editEmployeeState}
              type='button'
              className='inline-block text-gray-500 hover:text-gray-700 transition-colors rounded-full w-10 h-10 p-2 hover:bg-gray-200'
              title='Düzenle'
            >
              <svg className='inline-block h-5 w-5 fill-current' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path d='M19.5289 5.02397L14.9823 0.479304C14.8319 0.327449 14.6529 0.2069 14.4556 0.12463C14.2584 0.0423599 14.0467 0 13.833 0C13.6192 0 13.4076 0.0423599 13.2103 0.12463C13.013 0.2069 12.834 0.327449 12.6836 0.479304L0.478052 12.6797C0.326396 12.8302 0.206065 13.0092 0.124012 13.2064C0.0419593 13.4036 -0.000189662 13.615 6.41553e-07 13.8286V18.3733C6.41553e-07 18.8047 0.171459 19.2185 0.476657 19.5235C0.781855 19.8286 1.19579 20 1.62741 20H6.17398C6.38764 20.0002 6.59922 19.9581 6.79649 19.876C6.99377 19.794 7.17283 19.6737 7.32333 19.5222L19.5289 7.32171C19.8308 7.01546 20 6.60278 20 6.17284C20 5.7429 19.8308 5.33022 19.5289 5.02397ZM6.17398 18.3733H1.62741V13.8286L10.5781 4.88163L15.1247 9.42629L6.17398 18.3733ZM16.2741 8.27742L11.7275 3.73275L13.833 1.62818L18.3795 6.17284L16.2741 8.27742Z' />
              </svg>
            </button>
          )}
        </div>
        <div className='md:pl-6 pl-3'>
          <button
            onClick={deleteEmployee}
            type='button'
            className='inline-block text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors rounded-full w-10 h-10 p-2 hover:bg-red-100'
            title='Sil'
            disabled={employeeEditing ? 'disabled' : ''}
          >
            <svg className={`inline-block fill-current ${!employeeEditing ? '' : 'hidden'}`} width='17' height='20' viewBox='0 0 384 448' xmlns='http://www.w3.org/2000/svg'>
              <path d='M47.0019 64.0312C55.8213 63.48 63.4176 70.1827 63.9688 79.002L83.9688 399.002C83.9725 399.061 83.9759 399.12 83.9789 399.179C84.5322 409.947 91.6813 416 100 416H284C292.237 416 299.354 410.082 300.03 399.024L320.031 79.002C320.582 70.1827 328.179 63.48 336.998 64.0312C345.817 64.5825 352.52 72.1788 351.969 80.9981L331.97 400.976L331.97 400.979C330.385 426.9 311.102 448 284 448H100C73.1515 448 53.4161 427.084 52.0261 400.917L32.0312 80.9981C31.4799 72.1788 38.1826 64.5825 47.0019 64.0312Z' />
              <path d='M16 80.0001H368Z' />
              <path d='M0 80.0001C0 71.1635 7.16344 64.0001 16 64.0001H368C376.837 64.0001 384 71.1635 384 80.0001C384 88.8366 376.837 96.0001 368 96.0001H16C7.16344 96.0001 0 88.8366 0 80.0001Z' />
              <path d='M151.953 32C150.908 31.997 149.872 32.2006 148.906 32.5992C147.94 32.9978 147.062 33.5835 146.323 34.3226C145.583 35.0618 144.998 35.9397 144.599 36.9061C144.2 37.8724 143.997 38.908 144 39.9532L144 40.0001V80.0001C144 88.8367 136.837 96.0001 128 96.0001C119.163 96.0001 112 88.8367 112 80.0001V40.0205C111.988 34.7662 113.013 29.561 115.017 24.7035C117.024 19.8378 119.973 15.417 123.695 11.6952C127.417 7.97347 131.838 5.02423 136.703 3.01715C141.561 1.01343 146.766 -0.0118125 152.02 0.000102676H231.98C237.234 -0.0118125 242.439 1.01343 247.297 3.01715C252.162 5.02421 256.583 7.97342 260.305 11.6952C264.027 15.417 266.976 19.8379 268.983 24.7035C270.987 29.562 272.012 34.7683 272 40.0238V80.0001C272 88.8367 264.837 96.0001 256 96.0001C247.163 96.0001 240 88.8367 240 80.0001V40.0001L240 39.9532C240.003 38.908 239.799 37.8724 239.401 36.9061C239.002 35.9397 238.417 35.0617 237.677 34.3226C236.938 33.5835 236.06 32.9978 235.094 32.5992C234.128 32.2006 233.092 31.997 232.047 32L232 32.0001H152L151.953 32ZM119.429 128.01C128.26 127.695 135.674 134.598 135.99 143.429L143.99 367.429C144.305 376.26 137.402 383.674 128.571 383.99C119.74 384.305 112.326 377.402 112.01 368.571L104.01 144.571C103.695 135.74 110.598 128.326 119.429 128.01ZM264.571 128.01C273.402 128.326 280.305 135.74 279.99 144.571L271.99 368.571C271.674 377.402 264.26 384.305 255.429 383.99C246.598 383.674 239.695 376.26 240.01 367.429L248.01 143.429C248.326 134.598 255.74 127.695 264.571 128.01ZM192 128C200.837 128 208 135.164 208 144V368C208 376.837 200.837 384 192 384C183.163 384 176 376.837 176 368V144C176 135.164 183.163 128 192 128Z' />
            </svg>

            <div className={employeeEditing ? '' : 'hidden'}>
              <svg
                aria-hidden='true'
                className='w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
            </div>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default Employee
