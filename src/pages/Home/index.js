import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from 'pages/Home/Header'
import EmployeeList from 'pages/Home/EmployeeList'

const Home = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    try {
      axios
        .get('/employees')
        .then((response) => {
          setEmployees(response.data)
          console.log(response.data)
        })
        .catch(console.log)
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className='container xl mx-auto py-24'>
      <Header />
      <EmployeeList employees={employees} setEmployees={setEmployees} />
    </div>
  )
}

export default React.memo(Home)
