import { useEffect } from 'react'

export default () => {
  useEffect(() => {
    const luckysheet = window.luckysheet
    luckysheet.create({
      container: 'luckysheet',
      title: 'Luckysheet Demo',
      lang: 'es',
      showtoolbar: true,
      showinfobar: false,
      data: [
        {
          name: 'Producto',
          color: '#F3A712',
          status: '1',
          order: '0',
          celldata: [],
          config: {},
          index: 0
        },
        {
          name: 'Sheet2',
          color: '',
          status: '0',
          order: '1',
          celldata: [],
          config: {},
          index: 1
        },
        {
          name: 'Sheet3',
          color: '',
          status: '0',
          order: '2',
          data: [],
          config: {},
          index: 2
        }
      ]
    })
  }, [])

  return (
    <div className='flex-col'>
      <div className='w-full h-[60px] p-5 flex items-center bg-pink-950 text-white'>
        CubeWin
      </div>
      <div style={{ position: 'relative', width: '100%'}} className='h-[calc(100vh-60px)]'>
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
