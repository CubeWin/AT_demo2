import { useEffect, useState } from 'react'
import SelectTable from './SelectTable'
import SelectField from './SelectField'
import ShowData from './ShowData'
import CreateProject from './CreateProject'
import useNewProject from '../hooks/useNewProject'
import { Alert } from '@mui/material'
export default () => {
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('info')
  // const { project, table, queryField } = useContext(ProjectContext)
  // const [isPost, setIsPost] = useState(false)
  const {resMessage, isLoadingProject, isLoadingQuery, isLoadingQueryField, isLoadingQueryUpd, isLoadingSheet, setIsPost, isPost} =
    useNewProject()

  useEffect(() => {
    if (resMessage.length == 0) return
    setMessage(resMessage)
    switch (true) {
      case isLoadingProject:
        setSeverity('success')
        break
      case isLoadingQuery:
        setSeverity('info')
        break
      case isLoadingQueryField:
        setSeverity('success')
        break
      case isLoadingQueryUpd:
        setSeverity('info')
        break
      case isLoadingSheet:
        setSeverity('success')
        break
    }
  }, [resMessage])

  const handleClick = () =>{
    setIsPost(true)
  }

  return (
    <div>
      <h1 className='p-5'>Create Project</h1>
      <CreateProject />
      <SelectTable />
      <SelectField />
      <ShowData />
      <button className='btn m-5 p-3 bg-blue-600 text-white' onClick={handleClick} disabled={isPost}>
        Siguiente
      </button>
      <Alert severity={severity} className='m-5'>
        {message}
      </Alert>
    </div>
  )
}
