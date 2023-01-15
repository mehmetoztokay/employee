import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    try {
      axios
        .get('/employees')
        .then((response) => {
          setEmployees(response.data)
        })
        .catch(console.log)
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <div className='App'>
      {employees.map((employee, index) => (
        <p key={index}>{JSON.stringify(employee)}</p>
      ))}
    </div>
  )
}

export default App
