import { useEffect, useState } from 'react'
import { getField } from '../services/ApiFieldData'

export default () => {
  const [isLoading, setIsLoading] = useState(true)
  const [idTable, setIdTable] = useState(null)
  const [fieldList, setFieldList] = useState([])

  useEffect(() => {
    const getDataField = async () => {
      console.log('idTable', idTable)
      if (!idTable) {
        setIsLoading(false)
        return
      }
      const response = await getField(idTable)
      setFieldList(response)
      setIsLoading(false)
    }

    setIsLoading(true)
    getDataField()
  }, [idTable])

  return [isLoading, setIdTable, fieldList]
}
