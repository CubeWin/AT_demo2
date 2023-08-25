import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDataQuery } from '../services/ApiCommand'
import Crear from './Crear'
import CreateTableField from './CreateTableField'
import { ProjectContext } from '../context/ProjectContext'
import useSaveSheetPlain from '../hooks/useSaveSheetPlain'

export default () => {
  const { projectId } = useParams()
  const [isNew, setIsNew] = useState(false)
  const [isTable, setIsTable] = useState(false)
  const { setSheet, setProject, project } = useContext(ProjectContext)
  const [lSheet, setlSheet] = useState(null)
  const { setIsPost, isPost, resMessage, setSheetName, setCellData, updateSheetPlain } = useSaveSheetPlain()
  const luckysheet = window.luckysheet

  useEffect(() => {
    const getFullData = async () => {
      console.log('Load Data ===')
      const responseGetData = !projectId
        ? {
            id_project: null,
            arrSheet: [
              {
                name: 'Hoja1',
                color: '#Df3',
                status: '1',
                order: '0',
                celldata: [],
                config: {},
                index: 0
              }
            ]
          }
        : await getDataQuery(projectId)
      const { id_project, arrSheet } = responseGetData
      if (!!id_project) setProject(id_project)
      luckysheet.create({
        container: 'luckysheet',
        title: 'Luckysheet Demo',
        lang: 'es',
        showtoolbar: true,
        showinfobar: false,
        data: arrSheet
      })
    }

    getFullData()
  }, [projectId])

  useEffect(() => {
    if (!isTable) return
    const { sheet_id } = luckysheet.getSheet()
    if (!sheet_id) setSheet(null)
    setSheet(sheet_id)
  }, [isTable])

  const handleClick = () => {
    // const { sheet_id } = luckysheet.getSheet()

    const getAllSheets = luckysheet.getAllSheets()

    updateSheetPlain(getAllSheets)
    // getAllSheets.forEach((sheet) => {
    //   console.log('fe');
    //   console.log(sheet);
    //   if (true) return
    //   if (!sheet.sheet_id) {
    //     setSheetName(sheet.name)
    //     setCellData(sheet.celldata)
    //     setIsPost(true)
    //     console.log(JSON.stringify(sheet.celldata))
    //     console.log('FINISH ===')
    //   }
    // })
  }

  return (
    <div className='flex-col relative overflow-hidden'>
      <div className='w-full h-[20px] bg-slate-300 border border-slate-300 flex justify-between'>
        <ul className='h-full w-auto flex'>
          <li className='text-xs h-full'>
            <button
              onClick={() => {
                setIsNew((n) => !n)
              }}
              className='py-0 px-2 h-full transition-colors flex items-center hover:bg-green-600 hover:text-white active:ring-2 ring-green-800'
            >
              Nuevo
            </button>
          </li>
          <li className='text-xs h-full'>
            <button
              onClick={() => {
                setIsTable((n) => !n)
              }}
              className='py-0 px-2 h-full transition-colors flex items-center hover:bg-green-600 hover:text-white active:ring-2 ring-green-800'
            >
              Tablas
            </button>
          </li>
        </ul>
        <ul className='h-full'>
          {isPost && <li>{resMessage}</li>}
          <li className='text-xs h-full'>
            <button
              className='py-0 px-2 h-full transition-colors flex items-center hover:bg-green-600 hover:text-white active:ring-2 ring-green-800'
              onClick={handleClick}
            >
              Guardar
            </button>
          </li>
        </ul>
      </div>
      <div className='relative w-full h-[calc(100vh-84px)] overflow-hidden'>
        <div id='luckysheet' className='m-0 p-0 absolute w-full h-full left-0 top-0' />
      </div>
      <div
        className={`absolute transition-all w-[350px] h-full top-0 z-[9999] shadow-lg shadow-slate-950 ${
          isNew || isTable ? 'right-0' : '-right-[380px]'
        }`}
      >
        {/* <div className='h-full'>{isNew && <Crear beginCreation={setIsNew} />}</div>
        <div className='h-full'>{isTable && <ListTable />}</div> */}
        <div className='h-full'>
          {isNew ? <Crear beginCreation={setIsNew} /> : isTable ? <CreateTableField beginTable={setIsTable} /> : <p>Selected Data</p>}
        </div>
        <div className='absolute w-full h-full top-0 left-0 -z-10 bg-slate-100' />
      </div>
    </div>
  )
}
