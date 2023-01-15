import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from 'pages/Home/Header'
import EmployeeList from 'pages/Home/EmployeeList'

const Home = () => {
  const [employees, setEmployees] = useState([])

  const listingEmployees = async () => {
    await axios
      .get('/employees')
      .then((response) => {
        setEmployees(response.data)
        console.log(response.data)
      })
      .catch(console.log)
  }

  const resetEmployees = () => {
    listingEmployees()
  }

  useEffect(() => {
    listingEmployees()
  }, [])

  return (
    <div className='container xl mx-auto py-24'>
      <Header setEmployees={setEmployees} />
      <EmployeeList employees={employees} setEmployees={setEmployees} resetEmployees={resetEmployees} />
    </div>
  )
}

export default React.memo(Home)
