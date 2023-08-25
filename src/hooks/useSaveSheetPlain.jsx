import { useCallback, useContext, useEffect, useState } from 'react'
import { ProjectContext } from '../context/ProjectContext'
import { createQuery, updateQuery } from '../services/ApiQuery'
import { createQueryField } from '../services/ApiQueryField'
import { createSheet, updateSheet } from '../services/ApiSheet'
import { createPlain, updatePlain } from '../services/ApiPlain'

export default () => {
  const { project } = useContext(ProjectContext)
  const [isPost, setIsPost] = useState(false)
  const [sheetName, setSheetName] = useState(null)
  const [cellData, setCellData] = useState(null)

  const [isLoadingPlain, setIsLoadingPlain] = useState(false)
  const [isLoadingSheetUpd, setIsLoadingSheetUpd] = useState(false)
  const [isLoadingSheetCreate, setIsLoadingSheetCreate] = useState(false)

  const [resMessage, setResMessage] = useState('')
  const [isCompleteSuccess, setIsCompleteSuccess] = useState(false)

  const updateSheetPlain = useCallback(async (getAllSheets) => {
    const resUpdateAllSheetsPlain = getAllSheets.map(async (sheet) => {
      // solo actualizar las hojas que no sean isquery
      const { is_plain, id_plain, is_query, sheet_id, celldata, name } = sheet

      if (is_query) return

      let idSheetGet = sheet_id || null
      let idPlainGet = null

      if (!sheet_id) {
        const newSheetObj = { id_project: project, title: name, nivel: 0 }
        const resSheet = await createSheet(newSheetObj)
        if (!resSheet.id) throw new Error('No se pudo registrar la Hoja.')
        idSheetGet = resSheet.id
      }

      if (!is_plain) {
        const newPlainObj = { full_text: JSON.stringify(celldata) }
        const resPlain = await createPlain(newPlainObj)
        if (!resPlain.id) throw new Error(`No se pudo registrar el contenido de la Hoja ${name}.`)
        idPlainGet = resPlain.id

        const newSheetUpdObj = { title: name, nivel: 0, is_plain: true, id_plain: idPlainGet }
        const resSheetUpd = await updateSheet(newSheetUpdObj, idSheetGet)
        if (!resSheetUpd) throw new Error('No se pudo registrar la Hoja.')
      } else {
        // update isplain
        const newPlainObj = { full_text: JSON.stringify(celldata) }
        const resPlainUpd = await updatePlain(newPlainObj, id_plain)
        if (!resPlainUpd) throw new Error('No se pudo actualizar el contenido Plain.')
      }
    })

    try {
      const result = await Promise.all(resUpdateAllSheetsPlain)
      console.log('Se completo todo');
      console.log(result);
    } catch (error) {
      console.error('Ocurrio un Error:', error);
    }
  })

  useEffect(() => {
    if (!isPost) return
    setIsCompleteSuccess(false)
    const execProcess = async () => {
      try {
        let idSheetGet = null
        let idPlainGet = null

        setIsLoadingSheetCreate(true)
        setResMessage('Se esta registrando la hoja de trabajo...')
        const newSheetObj = { id_project: project, title: sheetName, nivel: 0 }
        const resSheet = await createSheet(newSheetObj)
        if (!resSheet.id) throw new Error('No se pudo registrar la Hoja.')
        idSheetGet = resSheet.id
        setIsLoadingSheetCreate(false)

        setIsLoadingPlain(true)
        setResMessage('Se esta guardando los datos...')
        const newPlainObj = { full_text: JSON.stringify(cellData) }
        const resPlain = await createPlain(newPlainObj)
        if (!resPlain.id) throw new Error(`No se pudo registrar el contenido de la Hoja ${sheetName}.`)
        idPlainGet = resPlain.id
        setIsLoadingPlain(false)

        setIsLoadingSheetUpd(true)
        setResMessage('Se esta actualizando el contenido de la Hoja de trabajo...')
        const newSheetUpdObj = { title: sheetName, nivel: 0, is_plain: true, id_plain: idPlainGet }
        const resSheetUpd = await updateSheet(newSheetUpdObj, idSheetGet)
        if (!resSheetUpd) throw new Error('No se pudo registrar la Hoja.')
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
    setSheetName,
    setCellData,
    isLoadingPlain,
    isLoadingSheetUpd,
    isLoadingSheetCreate,
    resMessage,
    isCompleteSuccess,
    updateSheetPlain
  }
}
