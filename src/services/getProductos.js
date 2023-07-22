export const getProducts = async () => {
    try {
      const response = await fetch(
        'https://backendapp_epc.cfapps.us10-001.hana.ondemand.com/producto',
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message)
      }

      const fulldata = data.data.request

      let rowCount = 0
      const headData = [
        {
          r: rowCount,
          c: 0,
          v: 'ID_PRODUCTO'
        },
        {
          r: rowCount,
          c: 1,
          v: 'NOMBRE'
        },
        {
          r: rowCount,
          c: 2,
          v: 'MARCA'
        },
        {
          r: rowCount,
          c: 3,
          v: 'PRICE'
        },
        {
          r: rowCount,
          c: 4,
          v: 'STOCK'
        }
      ]
      const formatData = fulldata.map((d) => {
        rowCount++
        return [
          {
            r: rowCount,
            c: 0,
            v: d.ID_PRODUCTO
          },
          {
            r: rowCount,
            c: 1,
            v: d.NOMBRE
          },
          {
            r: rowCount,
            c: 2,
            v: d.MARCA
          },
          {
            r: rowCount,
            c: 3,
            v: d.PRICE
          },
          {
            r: rowCount,
            c: 4,
            v: d.STOCK
          }
        ]
      })
      let formatData2 = [...headData, ...formatData]
      console.log(formatData2);
      console.log(formatData2.flat());
      return formatData2.flat()
    } catch (err) {
      console.log(err)
      return !err.error ? err : err.error.message
    }
  }
  