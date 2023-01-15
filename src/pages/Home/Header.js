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
    <div className='flex justify-between items-start'>
      <div className='flex'>
        <h2 className='font-semibold mr-8 mt-1'>Çalışan Listesi</h2>
        <Formik initialValues={formikHandles.initialValues} onSubmit={formikHandles.onSubmit} validationSchema={formikHandles.validationSchema}>
          {({ values, errors, touched }) => (
            <Form>
              <div className='relative'>
                <Field type='text' name='searchValue' placeholder='Çalışan ara' className='outline-1 outline-blue-600 border border-gray-300 rounded-md py-1 px-2' />
                <button type='submit'>
                  <picture width={15} height={15} className='absolute right-3 top-1/2 -translate-y-1/2'>
                    <img src={SearchIcon} alt='' />
                  </picture>
                </button>
              </div>
              {errors.searchValue && touched ? <p className='text-red-500 text-sm'>{errors.searchValue}</p> : ''}
            </Form>
          )}
        </Formik>
      </div>
      <button className='inline-block bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all px-4 py-1 mt-1'>Yeni Ekle</button>
    </div>
  )
}

export default Header
