import { useEffect, useState } from 'react'
import { getTableList } from '../services/ApiTableData'

export default () => {
  const [isLoading, setIsLoading] = useState(true)
  const [tableList, setTableList] = useState([])

  useEffect(() => {

    const getDataTable = async () => {
      const response = await getTableList()
      setTableList(response)
      setIsLoading(false)
    }

    setIsLoading(true)
    getDataTable()
  }, [])

  return [isLoading, tableList]
}
