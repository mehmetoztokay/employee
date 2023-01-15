import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from 'pages/Home/Header'
import EmployeeList from 'pages/Home/EmployeeList'

const Home = () => {
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])

  const maritalStatuses = [
    {
      id: 1,
      state: false,
      title: 'Bekâr'
    },
    {
      id: 1,
      state: true,
      title: 'Evli'
    }
  ]

  const listingEmployees = async () => {
    await axios
      .get('/employees')
      .then((response) => {
        setEmployees(response.data)
      })
      .catch(console.log)
  }

  const listingDepartments = async () => {
    await axios
      .get('/departments')
      .then((response) => {
        setDepartments(response.data)
      })
      .catch(console.log)
  }

  const resetEmployees = () => {
    listingEmployees()
  }

  useEffect(() => {
    listingEmployees()
    listingDepartments()
  }, [])

  return (
    <div className='container xl mx-auto py-24'>
      <Header setEmployees={setEmployees} />
      <EmployeeList employees={employees} setEmployees={setEmployees} departments={departments} maritalStatuses={maritalStatuses} resetEmployees={resetEmployees} />
    </div>
  )
}

export default React.memo(Home)
