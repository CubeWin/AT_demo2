import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDataQuery } from '../services/ApiCommand'
import Crear from './crear'
import ListTable from './lista'

export default () => {
  const { projectId } = useParams()
  const [isNew, setIsNew] = useState(false)
  const [isTable, setIsTable] = useState(false)
  const [isField, setIsField] = useState(false)

  useEffect(() => {
    const getFullData = async () => {
      console.log('Load Data ===')
      const fulldata = !projectId ? [] : await getDataQuery(projectId)
      const nameData = projectId || 'Hoja 1'
      const luckysheet = window.luckysheet
      luckysheet.create({
        container: 'luckysheet',
        title: 'Luckysheet Demo',
        lang: 'es',
        showtoolbar: true,
        showinfobar: false,
        data: [
          {
            name: nameData,
            color: '#F3A712',
            status: '1',
            order: '0',
            celldata: fulldata,
            config: {},
            index: 0
          }
        ]
      })
    }

    getFullData()
  }, [projectId])

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
             className='py-0 px-2 h-full transition-colors flex items-center hover:bg-green-600 hover:text-white active:ring-2 ring-green-800'>
              Tablas
            </button>
          </li>
          <li className='text-xs h-full'>
            <button className='py-0 px-2 h-full transition-colors flex items-center hover:bg-green-600 hover:text-white active:ring-2 ring-green-800'>
              Campos
            </button>
          </li>
        </ul>
        <ul className='h-full'>
          <li className='text-xs h-full'>
            <button className='py-0 px-2 h-full transition-colors flex items-center hover:bg-green-600 hover:text-white active:ring-2 ring-green-800'>
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
        <div className='h-full'>{isNew ? <Crear beginCreation={setIsNew} /> : isTable ? <ListTable /> : <p>Selected Data</p>}</div>
        <div className='absolute w-full h-full top-0 left-0 -z-10 bg-slate-100' />
      </div>
    </div>
  )
}
