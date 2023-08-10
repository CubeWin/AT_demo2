import { useContext } from 'react'
import { ProjectContext } from '../context/ProjectContext'

export default () => {
  const { project, query, setQuery, table, queryField } = useContext(ProjectContext)
  return (
    <div className='m-3 border p-5 bg-slate-300'>
      <h1>View Data</h1>
      <div className='py-1 flex'>
        <p className='font-bold mr-1'>project_name: </p>
        <p className='text-rose-800'>{project.name}</p>
      </div>
      <div className='py-1 flex'>
        <p className='font-bold mr-1'>project_description: </p>
        <p className='text-rose-800'>{project.description}</p>
      </div>
      <div className='py-1 flex'>
        <p className='font-bold mr-1'>Table_id: </p>
        <p className='text-rose-800'>{table.id}</p>
      </div>
      <div className='py-1 flex'>
        <p className='font-bold mr-1'>Table_name: </p>
        <p className='text-rose-800'>{table.name}</p>
      </div>
      <div className='border py-2 rounded'>
        {queryField.length > 0 &&
          queryField.map((field) => (
            <div key={`${field.field_name}`} className='flex'>
              <div className='py-1 flex px-2'>
                <p className='font-bold mr-1'>field_id: </p>
                <p className='text-rose-800'>{field.id_query || '0'}</p>
              </div>
              <div className='py-1 flex px-2'>
                <p className='font-bold mr-1'>field_name: </p>
                <p className='text-rose-800'>{field.field_name}</p>
              </div>
              <div className='py-1 flex px-2'>
                <p className='font-bold mr-1'>field_isActive: </p>
                <p className='text-rose-800'>{`${field.is_active}`}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
