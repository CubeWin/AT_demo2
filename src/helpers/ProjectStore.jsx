import { useEffect, useState } from 'react'

export const projectStore = () => {
  const [project, setProject] = useState({ id_project: null, name: 'Basic', description: 'Decription' })
  const [query, setQuery] = useState({ id_data_table: 0, name: '', sentence: '' })
  const [table, setTable] = useState({ id: null, name: '' })
  const [field, setField] = useState({ id_query: '', field_name: '', is_active: '' })
  const [sheet, setSheet] = useState('')
  const [queryField, setQueryField] = useState([])

  useEffect(() => {
    setQueryField((queryField) => [...queryField, field])
  }, [field])

  return {
    project,
    setProject,
    query,
    table,
    setTable,
    setQuery,
    setField,
    queryField,
    setQueryField,
    sheet,
    setSheet
  }
}
