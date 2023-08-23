import { useEffect, useState } from 'react'
import { createProject } from '../services/ApiProject'
import { createSheet } from '../services/ApiSheet'
import { useNavigate } from 'react-router-dom'

export default () => {
  const [project, setProject] = useState({})
  const [isLoadingProject, setIsLoadingProject] = useState(false)
  const [isPost, setIsPost] = useState(false)
  const [success, setSuccess] = useState(false)
  const [resMessage, setResMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!isPost) return
    setSuccess(false)
    setIsLoadingProject(true)
    setResMessage('Cargando...')
    const execProcess = async () => {
      try {
        if (!project.name) {
          throw new Error('El campo Nombre es obligatorio.')
        }
        const newProjectObj = {
          name: project.name,
          description: project.description || ''
        }
        const resProjectCreate = await createProject(newProjectObj)
        if (!resProjectCreate.id) throw new Error('No se pudo registrar el proyecto.')
        const projectID = resProjectCreate.id

        const newSheetObj = {
          id_project: projectID,
          title: projectID
        }
        const resSheetCreate = await createSheet(newSheetObj)
        if (!resSheetCreate.id) throw new Error('No se pudo registrar la primera hoja.')

        setIsLoadingProject(false)
        setSuccess(true)
        return navigate(`../workbook/${projectID}`)
      } catch (error) {
        setResMessage(`Se encontraron los siguientes errores:${error.message}`)
      } finally {
        setIsPost(false)
      }
    }
    execProcess()
  }, [isPost])

  return {
    setProject,
    setIsPost,
    isPost,
    isLoadingProject,
    resMessage,
    success
  }
}
