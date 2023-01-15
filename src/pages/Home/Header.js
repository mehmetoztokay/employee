import React from 'react'
import SearchIcon from 'assets/icons/search.svg'
import { Field, Form, Formik } from 'formik'
import { SearchSchema } from 'validations'

const Header = () => {
  const formikHandles = {
    initialValues: {
      searchValue: ''
    },
    onSubmit: (values) => {
      console.log(values)
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
              <Form className='w-full md:w-72'>
                <div className='relative w-full'>
                  <Field type='text' name='searchValue' placeholder='Çalışan ara' className='w-full outline-1 outline-blue-600 border border-gray-300 rounded-md py-2 px-2' />
                  <button type='submit'>
                    <picture width={25} height={25} className='absolute right-3 top-1/2 -translate-y-1/2 hover:bg-gray-200 transition-all rounded-full p-2'>
                      <img src={SearchIcon} alt='' />
                    </picture>
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
