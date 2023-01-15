import React, { useState } from 'react'
import { Field, Formik, Form } from 'formik'
import { EmployeeSchema } from 'validations'
import Select from 'react-select'
import axios from 'axios'

const stylesOfSelect = {
  control: (styles, state) => ({ ...styles, outline: 0, borderRadius: 6, padding: 2, boxShadow: state.isFocused ? '0 0 0 1px #2563eb' : null }),
  menuList: (styles) => ({ ...styles, backgroundColor: 'transparent', borderRadius: 6 }),
  option: (styles, state) => ({ ...styles, backgroundColor: state.isFocused ? '#bfdbfe' : 'white', color: '#000' })
}

const AddEmployee = ({ setEmployees, departments, maritalStatuses }) => {
  const [addEmployeeStatus, setAddEmployeeStatus] = useState(false)

  const formikHandles = {
    initialValues: {
      fullname: '',
      email: '',
      maritalStatus: '',
      departmentId: ''
    },
    onSubmit: async (values, { resetForm }) => {
      // Setting status of spinner
      setAddEmployeeStatus(true)

      await axios
        .post(`/employees`, values)
        .then((response) => {
          if (response.status === 201) {
            // Setting values of view
            setEmployees((prevEmployees) => [...prevEmployees, values])
            // Setting state of spinner and editable inputs
            setAddEmployeeStatus(false)
          } else setAddEmployeeStatus(false)
          resetForm()
        })
        .catch((error) => {
          console.log(error)
          // Setting state of spinner and editable inputs
          setAddEmployeeStatus(false)
        })
    },
    validationSchema: EmployeeSchema
  }

  return (
    <div className='mt-4'>
      <Formik onSubmit={formikHandles.onSubmit} initialValues={formikHandles.initialValues} validationSchema={formikHandles.validationSchema}>
        {({ values, errors, touched, handleBlur, setFieldValue }) => (
          <Form className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-4 mb-16'>
            <div>
              <Field
                type='text'
                name='fullname'
                placeholder='Ad soyad'
                className='w-full block text-gray-800 whitespace-nowrap outline-1 outline-blue-600 border border-gray-300 rounded-md p-2'
              />
              <p className={`text-red-500 text-sm ${errors.fullname && touched.fullname ? '' : 'invisible'}`}>Hata: {errors.fullname}</p>
            </div>
            <div>
              <Field
                type='text'
                name='email'
                placeholder='E mail'
                className='w-full block text-gray-800 whitespace-nowrap outline-1 outline-blue-600 border border-gray-300 rounded-md p-2'
              />
              <p className={`text-red-500 text-sm ${errors.email && touched.email ? '' : 'invisible'}`}>Hata: {errors.email}</p>
            </div>
            <div>
              <Select
                onBlur={() => {
                  handleBlur({ target: { name: 'departmentId' } })
                }}
                onChange={(option) => {
                  setFieldValue('departmentId', option.id)
                }}
                options={departments.map((department) => ({ ...department, label: department.title }))}
                styles={stylesOfSelect}
              />
              <p className={`text-red-500 text-sm ${errors.departmentId && touched.departmentId ? '' : 'invisible'}`}>Hata: {errors.departmentId}</p>
            </div>
            <div>
              <Select
                onBlur={() => {
                  handleBlur({ target: { name: 'maritalStatus' } })
                }}
                onChange={(option) => {
                  setFieldValue('maritalStatus', option.state)
                }}
                options={maritalStatuses.map((maritalStatus) => ({ ...maritalStatus, label: maritalStatus.title }))}
                styles={stylesOfSelect}
              />
              <p className={`text-red-500 text-sm ${errors.maritalStatus && touched.maritalStatus ? '' : 'invisible'}`}>Hata: {errors.maritalStatus}</p>
            </div>
            <div>
              <button
                type='submit'
                className='flex items-center justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all px-4 py-2 w-full '
                title='Ekle'
                disabled={addEmployeeStatus ? 'disabled' : ''}
              >
                <div className={addEmployeeStatus ? '' : 'hidden'}>
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
                <span className='text-center'>Ekle</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddEmployee
