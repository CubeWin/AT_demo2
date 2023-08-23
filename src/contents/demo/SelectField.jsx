import { useContext, useEffect, useState } from 'react'
import { ProjectContext } from '../../context/ProjectContext'
import useFieldGet from '../../hooks/useFieldGet'

export default () => {
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
    // console.log(e.target.name)
    // console.log(e.target.value)
    // console.log(e.target.checked)
    // console.log(e.target)
    // console.log(fieldData[e.target.name])
    setFieldData((fdata) => ({ ...fdata, [e.target.name]: { id_query: '', field_name: e.target.name, is_active: e.target.checked } }))
  }

  useEffect(() => {
    if (Object.values(fieldData).length <= 0) return
    console.log('Exceute setfield')
    setQueryField(Object.values(fieldData))
  }, [fieldData])

  return (
    <div className='m-3 border p-5 bg-slate-300'>
      <h1>Select Field</h1>
      {isLoading && <p>Buscando campos...</p>}
      {!isLoading &&
        fieldList.length > 0 &&
        fieldList.map((field, index) => (
          <div key={`${field.ID_DATA_FIELD}`}>
            <input type='checkbox' id={field.ID_DATA_FIELD} name={field.FIELD_NAME} value={field.ID_DATA_FIELD} onChange={handleChange} />
            <label htmlFor={field.ID_DATA_FIELD}>{field.FIELD_NAME}</label>
          </div>
        ))}
    </div>
  )
}
