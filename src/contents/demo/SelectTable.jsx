import { useContext } from 'react'
import useTableGet from '../../hooks/useTableGet'
import { ProjectContext } from '../../context/ProjectContext'

export default () => {
  const [isLoading, tableList] = useTableGet()
  const { setTable } = useContext(ProjectContext)

  const radioSelect = (e) => {
    console.log('radioSelect')
    setTable((tab) => ({ ...tab, ...JSON.parse(e.target.value) }))
  }

  return (
    <div className='m-3 border p-5 bg-slate-300'>
      <h1>Select Table</h1>
      {isLoading && <p>Cargando...</p>}
      {tableList.length > 0 &&
        tableList.map((tab) => (
          <div key={tab.ID_DATA_TABLE}>
            <input
              type='radio'
              id={tab.ID_DATA_TABLE}
              name='table_name'
              value={`{ "id": "${tab.ID_DATA_TABLE}", "name": "${tab.TABLE_NAME}" }`}
              onChange={radioSelect}
            />
            <label htmlFor={tab.ID_DATA_TABLE}>{tab.TABLE_NAME}</label>
          </div>
        ))}
    </div>
  )
}
