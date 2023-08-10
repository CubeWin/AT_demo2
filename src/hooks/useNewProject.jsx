import { useContext, useEffect, useState } from 'react'
import { ProjectContext } from '../context/ProjectContext'
import { createProject } from '../services/ApiProject'
import { createQuery, updateQuery } from '../services/ApiQuery'
import { createQueryField } from '../services/ApiQueryField'
import { createSheet } from '../services/ApiSheet'

export default () => {
  const { project, table, queryField } = useContext(ProjectContext)
  // const [isLoading, setIsLoading] = useState(false)
  const [isLoadingProject, setIsLoadingProject] = useState(false)
  const [isLoadingQuery, setIsLoadingQuery] = useState(false)
  const [isLoadingQueryField, setIsLoadingQueryField] = useState(false)
  const [isLoadingQueryUpd, setIsLoadingQueryUpd] = useState(false)
  const [isLoadingSheet, setIsLoadingSheet] = useState(false)
  const [isPost, setIsPost] = useState(false)
  const [resMessage, setResMessage] = useState('')

  useEffect(() => {
    if (!isPost) return
    const execProcess = async () => {
      try {
        /** Insertar en Project */
        setIsLoadingProject(true)
        setResMessage('Se esta registrando el proyecto...')
        const newProjectObj = { name: project.name, description: project.description }
        console.log(newProjectObj)
        const resProjectCreate = await createProject(newProjectObj)
        console.log('response API register project: ', resProjectCreate)
        if (!resProjectCreate.id) throw new Error('No se pudo registrar el proyecto.')
        const projectID = resProjectCreate.id
        setIsLoadingProject(false)

        /** Insertar en QUERY */
        setIsLoadingQuery(true)
        setResMessage('Se esta registrando el query...')
        const newQuerytObj = { id_data_table: table.id, sentence: '', name: table.name }
        console.log(newQuerytObj);
        const resQueryCreate = await createQuery(newQuerytObj)
        console.log('response API register query: ', resQueryCreate)
        if (!resQueryCreate.id) throw new Error('No se pudo registrar el proyecto.')
        const queryID = resQueryCreate.id
        setIsLoadingQuery(false)

        /** Insertar en QUERY FIELDS */
        setIsLoadingQueryField(true)
        setResMessage('Se esta registrando los campos...')
        let sqlQuery = ''
        const arrFieldPrmise = queryField.map(async (field) => {
          const newQueryField = { ...field, id_query: queryID }
          console.log(newQueryField);
          const resQueryField = await createQueryField(newQueryField)
          if (!resQueryField.id) setResMessage((m) => `${m} \n Error al registrar un campo: ${field.field_name}`)
          if (field.is_active) {
            console.log(field);
            sqlQuery += sqlQuery.length == 0 ? '' : ','
            sqlQuery += `${field.field_name}`
          }
          return true
        })
        await Promise.all(arrFieldPrmise);
        setIsLoadingQueryField(false)

        /** Actualizar en QUERY(sentencia) */
        setIsLoadingQueryUpd(true)
        setResMessage('Se esta Actualizando el query...')
        sqlQuery = `SELECT ${sqlQuery}`
        sqlQuery += ` FROM ${table.name}`
        console.log(sqlQuery);
        const resUpdQuery = await updateQuery(queryID, { id_data_table: table.id, sentence: sqlQuery, name: table.name })
        console.log('response API update query: ', resUpdQuery)
        if (!resUpdQuery) throw new Error('No se pudo actualizar la sentencia.')
        setIsLoadingQueryUpd(false)

        /** Insertar en SHEET */
        setIsLoadingSheet(true)
        setResMessage('Se esta registrando las hojas del libro...')
        const newSheetObj = { id_project: projectID, title: table.name, nivel: 0, is_query: true, id_query: queryID }
        console.log(newSheetObj)
        const resSheet = await createSheet(newSheetObj)
        if (!resSheet.id) throw new Error('No se pudo registrar la Hoja.')
        setIsLoadingSheet(false)
        setResMessage('Regitro Finalizado')
      } catch (error) {
        setResMessage(`El proceso se detuvo, error : ${error.message}`)
      } finally{
        setIsPost(false)
      }
    }
    execProcess()
  }, [isPost])

  return {
    resMessage,
    isLoadingProject,
    isLoadingQuery,
    isLoadingQueryField,
    isLoadingQueryUpd,
    isLoadingSheet,
    isPost,
    setIsPost
  }
}
