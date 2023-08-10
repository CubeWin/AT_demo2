import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDataQuery } from '../services/ApiCommand'

export default () => {
  const { projectId } = useParams()

  useEffect(() => {
    const getFullData = async () => {
      if (!projectId) return
      const Fulldata = await getDataQuery(projectId)
      console.log(Fulldata)

      const luckysheet = window.luckysheet
      luckysheet.create({
        container: 'luckysheet',
        title: 'Luckysheet Demo',
        lang: 'es',
        showtoolbar: true,
        showinfobar: false,
        data: [
          {
            name: projectId,
            color: '#F3A712',
            status: '1',
            order: '0',
            celldata: Fulldata,
            config: {},
            index: 0
          }
        ]
      })
    }

    getFullData()
  }, [])
  return (
    <div className='flex-col'>
      <div style={{ position: 'relative', width: '100%' }} className='h-[calc(100vh-60px)]'>
        <div
          id='luckysheet'
          style={{
            margin: '0px',
            padding: '0px',
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: '0px',
            top: '0px'
          }}
        ></div>
      </div>
    </div>
  )
}
