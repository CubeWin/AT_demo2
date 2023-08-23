import { Box, Container, List } from '@mui/material'
import Button from '@mui/material/Button'
import useTableGet from '../hooks/useTableGet'
import { ProjectContext } from '../context/ProjectContext'
import { Fragment, useContext, useState } from 'react'
import SchemaIcon from '@mui/icons-material/Schema'

export default function Lista({ primaryKey, secondaryKey }) {
  const [isLoading, tableList] = useTableGet()
  const { setTable } = useContext(ProjectContext)

  const radioSelect = (e) => {
    setTable((tab) => ({ ...tab, ...JSON.parse(e.target.value) }))
  }

  return (
    <Container className='absolute h-full w-full flex flex-col justify-between'>
      <div className='max-w-[450px] p-0 w-full'>
        <h1 className='text-slate-600 my-5 font-thin text-center text-3xl font-[Helvetica]'>Seleccionar Procedencia de datos</h1>
        <Box className='w-full bg-gray-300 min-h-[350px] max-h-[50vh] rounded-md overflow-auto'>
          <div className='m-0 p-0'>
            {isLoading && <p>...loading</p>}
            {!isLoading &&
              tableList.length > 0 &&
              tableList.map((tab) => (
                <Fragment key={tab.ID_DATA_TABLE}>
                  <label
                    className='flex items-center justify-between p-3 bg-zinc-300 border-b border-zinc-200 cursor-pointer'
                    htmlFor={tab.ID_DATA_TABLE}
                  >
                    <span>
                      <SchemaIcon className='text-slate-700 mr-2' />
                      <span className='m-0 p-0 checked:text-blue-500'>{tab.TABLE_NAME}</span>
                    </span>
                    <input
                      type='radio'
                      id={tab.ID_DATA_TABLE}
                      name='table_name'
                      className='text-lg'
                      value={`{ "id": "${tab.ID_DATA_TABLE}", "name": "${tab.TABLE_NAME}" }`}
                      onChange={radioSelect}
                    />
                    {/* {document.getElementById(tab.ID_DATA_TABLE).checked ? <RadioButtonUncheckedIcon /> : <RadioButtonCheckedIcon />} */}
                  </label>
                </Fragment>
              ))}
          </div>
        </Box>
      </div>
      <div className='p-2 flex justify-around'>
        <Button
          className='btn bg-slate-100 text-black border border-slate-600'
          onClick={() => {
            secondaryKey(false)
          }}
        >
          Cancelar
        </Button>
        <Button className='btn bg-cyan-600 text-white active:ring-2 active:ring-teal-400' onClick={primaryKey}>
          Siguiente
        </Button>
      </div>
    </Container>
  )
}
