import React, { useContext, useEffect, useState } from 'react'
import { ProjectContext } from '../context/ProjectContext'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import { Button } from '@mui/material'

export default ({ secondaryKey }) => {
  const { project, table, queryField } = useContext(ProjectContext)
  const [dataField, setDataField] = useState()

  useEffect(() => {
    console.log('RESP ->',queryField)
    const resp = queryField.filter((a) => {
      if (a.is_active) return true
    })
    setDataField(resp)
  }, [])

  return (
    <div className='absolute h-full w-full flex flex-col justify-between max-w-[450px] px-3'>
      <div className=' p-0 w-full text-center'>
        <h1 className='text-slate-600 my-5 font-thin text-center text-3xl font-[Helvetica]'>Resumen</h1>
        <AccountTreeIcon className='text-8xl text-amber-500 mb-3' />
        <div className='text-center mb-5'>
          <h2 className='font-bold text-3xl'>{table.name}</h2>
          <small className='text-xs text-gray-600'>{table.id}</small>
        </div>
        <div className='border border-spacing-2 border-stone-300 rounded-md overflow-auto w-full max-h-[50vh] min-h-[350px] shadow-inner'>
          {dataField &&
            dataField.length > 0 &&
            dataField.map((field) => (
              <div
                key={`${field.field_name}`}
                className={`flex py-2 px-1 text-center border-b ${field.is_active ? 'bg-slate-300' : 'text-stone-500'}`}
              >
                <p className={`text-center text-lg ${field.is_active ? 'text-slate-700' : 'text-stone-100'}`}>{field.field_name}</p>
              </div>
            ))}
        </div>
      </div>
      <div className='p-2 flex justify-around'>
        <Button className='btn bg-slate-100 text-black border border-slate-600' onClick={secondaryKey}>
          Cancelar
        </Button>
        <Button className='btn bg-cyan-600 text-white active:ring-2 active:ring-teal-400'>Confirmar</Button>
      </div>
    </div>
  )
}
