import { useContext, useEffect, useState } from 'react'
import { ProjectContext } from '../../context/ProjectContext'

export default () => {
  const { setProject } = useContext(ProjectContext)
  const [projectData, setProjectData] = useState({ name: '', description: '' })

  const handleChange = (e) => {
    setProjectData((values) => ({ ...values, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    setProject((values) => ({ ...values, ...projectData }))
  }, [projectData])

  return (
    <div className='m-3 border p-5 bg-slate-300'>
      <h1>Crear Proyecto</h1>
      <label htmlFor='name'>Nombre</label>
      <input type='text' id='name' name='name' className='block my-2' onChange={handleChange} autoComplete='off' />
      <label htmlFor='description'>Descripcion</label>
      <input type='text' id='description' name='description' className='block my-2' onChange={handleChange} autoComplete='off' />
    </div>
  )
}
