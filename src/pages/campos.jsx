import { Fragment, useContext, useEffect, useState } from 'react'
import { Box, Container, Button } from '@mui/material'
import useFieldGet from '../hooks/useFieldGet'
import { ProjectContext } from '../context/ProjectContext'
import CableIcon from '@mui/icons-material/Cable';

export default ({ primaryKey, secondaryKey }) => {
  const { table, setQueryField } = useContext(ProjectContext)
  const [isLoading, setIdTable, fieldList] = useFieldGet()
  const [fieldData, setFieldData] = useState({})
  useEffect(() => {
    setIdTable(table.id)
  }, [table.id])

  useEffect(() => {
    setFieldData(() => {
      let listField = {}
      if (!fieldList) {
        return
      }
      fieldList.forEach((f) => {
        listField = { ...listField, [f.FIELD_NAME]: { field_name: f.FIELD_NAME, is_active: false } }
      })
      return listField
    })
    // console.log(fieldData)
  }, [fieldList])

  const handleChange = (e) => {
    setFieldData((fdata) => ({ ...fdata, [e.target.name]: { id_query: '', field_name: e.target.name, is_active: e.target.checked } }))
  }

  useEffect(() => {
    if (Object.values(fieldData).length <= 0) return
    setQueryField(Object.values(fieldData))
  }, [fieldData])

  return (
    <Container className='absolute h-full w-full flex flex-col justify-between'>
      <div className='max-w-[450px] p-0 w-full'>
        <h1 className='text-slate-600 my-5 font-thin text-center text-3xl font-[Helvetica]'>Seleccionar Procedencia de datos</h1>
        <Box className='w-full bg-gray-300 min-h-[350px] max-h-[50vh] rounded-md overflow-auto'>
          <div className='m-0 p-0'>
            {isLoading && <p>...loading<br/></p>}
            {!isLoading && (fieldList.length > 0) &&
              fieldList.map((field) => (
                <Fragment key={`${field.ID_DATA_FIELD}`}>
                  <label
                    className='flex items-center justify-between p-3 bg-zinc-300 border-b border-zinc-200 cursor-pointer'
                    htmlFor={field.ID_DATA_FIELD}
                  >
                    <span>
                      <CableIcon className='text-slate-700 mr-2' />
                      <span className='m-0 p-0 checked:text-blue-500'>{field.FIELD_NAME}</span>
                    </span>
                    <input
                      type='checkbox'
                      id={field.ID_DATA_FIELD}
                      name={field.FIELD_NAME}
                      value={field.ID_DATA_FIELD}
                      onChange={handleChange}
                    />
                  </label>
                </Fragment>
              ))}
          </div>
        </Box>
      </div>
      <div className='p-2 flex justify-around'>
        <Button className='btn bg-slate-100 text-black border border-slate-600' onClick={secondaryKey}>Regresar</Button>
        <Button className='btn bg-cyan-600 text-white active:ring-2 active:ring-teal-400' onClick={primaryKey}>
          Siguiente
        </Button>
      </div>
    </Container>
  )
}
