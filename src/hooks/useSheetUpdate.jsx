import { useContext, useEffect, useState } from 'react'
import { ProjectContext } from '../context/ProjectContext'
import { createQuery, updateQuery } from '../services/ApiQuery'
import { createQueryField } from '../services/ApiQueryField'
import { createSheet, updateSheet } from '../services/ApiSheet'

export default () => {
  const { sheet, table, queryField, setSheet, project } = useContext(ProjectContext)
  const [isPost, setIsPost] = useState(false)
  const [isLoadingQuery, setIsLoadingQuery] = useState(false)
  const [isLoadingQueryField, setIsLoadingQueryField] = useState(false)
  const [isLoadingQueryUpd, setIsLoadingQueryUpd] = useState(false)
  const [isLoadingSheetUpd, setIsLoadingSheetUpd] = useState(false)
  const [isLoadingSheetCreate, setIsLoadingSheetCreate] = useState(false)
  const [resMessage, setResMessage] = useState('')
  const [isCompleteSuccess, setIsCompleteSuccess] = useState(false)

  useEffect(() => {
    if (!isPost) return
    setIsCompleteSuccess(false)
    const execProcess = async () => {
      try {
        let idSheetGet = null;
        if (!sheet) {
          console.log('No hay sheet', sheet)
          setIsLoadingSheetCreate(true)
          setResMessage('Se esta registrando la hoja de trabajo...')
          const newSheetObj = { id_project: project, title: table.name, nivel: 0 }
          const resSheet = await createSheet(newSheetObj)
          if (!resSheet.id) throw new Error('No se pudo registrar la Hoja.')
          setSheet(resSheet.id)
          idSheetGet= resSheet.id
          setIsLoadingSheetCreate(false)
        }

        /** Insertar en QUERY */
        setIsLoadingQuery(true)
        setResMessage('Se esta registrando el query...')
        const newQuerytObj = { id_data_table: table.id, sentence: '', name: table.name }
        const resQueryCreate = await createQuery(newQuerytObj)
        if (!resQueryCreate.id) throw new Error('No se pudo registrar el proyecto.')
        const queryID = resQueryCreate.id
        setIsLoadingQuery(false)

        /** Insertar en QUERY FIELDS */
        setIsLoadingQueryField(true)
        setResMessage('Se esta registrando los campos...')
        let sqlQuery = ''
        const arrFieldPrmise = queryField.map(async (field) => {
          const newQueryField = { ...field, id_query: queryID }
          const resQueryField = await createQueryField(newQueryField)
          if (!resQueryField.id) setResMessage((m) => `${m} \n Error al registrar un campo: ${field.field_name}`)
          if (field.is_active) {
            console.log(field)
            sqlQuery += sqlQuery.length == 0 ? '' : ','
            sqlQuery += `${field.field_name}`
          }
          return true
        })
        await Promise.all(arrFieldPrmise)
        setIsLoadingQueryField(false)

        /** Actualizar en QUERY(sentencia) */
        setIsLoadingQueryUpd(true)
        setResMessage('Se esta Actualizando el query...')
        sqlQuery = `SELECT ${sqlQuery}`
        sqlQuery += ` FROM ${table.name}`
        const resUpdQuery = await updateQuery(queryID, { id_data_table: table.id, sentence: sqlQuery, name: table.name })
        if (!resUpdQuery) throw new Error('No se pudo actualizar la sentencia.')
        setIsLoadingQueryUpd(false)

        /** Update en SHEET */
        setIsLoadingSheetUpd(true)
        setResMessage('Se esta registrando las hojas del libro...')
        const newSheetObj = { title: table.name, nivel: 0, is_query: true, id_query: queryID }
        console.log(sheet)
        const resSheet = await updateSheet(newSheetObj, sheet || idSheetGet)
        if (!resSheet) throw new Error('No se pudo registrar la Hoja.')
        setIsLoadingSheetUpd(false)
        setResMessage('Regitro Finalizado')
        setIsCompleteSuccess(true)
      } catch (error) {
        setResMessage(`Se encontraron los siguientes errores:${error.message}`)
      } finally {
        setIsPost(false)
      }
    }
    execProcess()
  }, [isPost])

  return {
    isPost,
    setIsPost,
    isLoadingQuery,
    isLoadingQueryField,
    isLoadingQueryUpd,
    isLoadingSheetUpd,
    isLoadingSheetCreate,
    resMessage,
    isCompleteSuccess
  }
}
