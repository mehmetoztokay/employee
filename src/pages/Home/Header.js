import React, { useState } from 'react'
import SearchIcon from 'assets/icons/search.svg'
import { Field, Form, Formik } from 'formik'
import { SearchSchema } from 'validations'
import axios from 'axios'

const Header = ({ setEmployees }) => {
  const [searchEmployees, setSearchEmployees] = useState(false)

  const formikHandles = {
    initialValues: {
      searchValue: ''
    },
    onSubmit: ({ searchValue }) => {
      setSearchEmployees(true)
      axios
        .get(`/employees?q=${searchValue}`)
        .then((response) => {
          setEmployees(response.data)

          setSearchEmployees(false)
        })
        .catch((error) => {
          console.log(error)
          setSearchEmployees(false)
        })
    },
    validationSchema: SearchSchema
  }

  return (
    <>
      <div className='flex'>
        <div className='flex w-full md:flex-row flex-col'>
          <h2 className='font-semibold whitespace-nowrap mr-8 my-2'>Çalışan Listesi</h2>
          <Formik initialValues={formikHandles.initialValues} onSubmit={formikHandles.onSubmit} validationSchema={formikHandles.validationSchema}>
            {({ values, errors, touched }) => (
              <Form className=' w-full md:w-72'>
                <div className='flex items-center'>
                  <div className='relative w-full'>
                    <Field type='text' name='searchValue' placeholder='Çalışan ara' className='w-full outline-1 outline-blue-600 border border-gray-300 rounded-md py-2 px-2' />
                    <button type='submit'>
                      <picture width={25} height={25} className='absolute right-3 top-1/2 -translate-y-1/2 hover:bg-gray-200 transition-all rounded-full p-2'>
                        <img src={SearchIcon} alt='' />
                      </picture>
                    </button>
                  </div>
                  <button
                    type='submit'
                    className='flex gap-2 items-center bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all px-4 py-2 ml-2'
                    disabled={searchEmployees ? 'disabled' : null}
                  >
                    <div className={searchEmployees ? '' : 'hidden'}>
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
                    Ara
                  </button>
                </div>

                {errors.searchValue && touched ? <p className='text-red-500 text-sm'>{errors.searchValue}</p> : ''}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <button className='inline-block bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all px-4 py-1 mt-14'>Yeni Ekle</button>
    </>
  )
}

export default Header
