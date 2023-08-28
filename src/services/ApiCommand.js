import { API_BASE_URL } from "../constants/dataConfig";

export const getDataQuery = async (id_project) => {
  const url = `${API_BASE_URL}/command/${id_project}`;
  const res = await fetch(url);
  const { data: sheetDataFullArr } = await res.json()

  if (!sheetDataFullArr || sheetDataFullArr.length <= 0) {
    return {
      id_project: null,
      arrSheet: [{
        name: 'Hoja1',
        color: '#Df3',
        status: '1',
        order: '0',
        celldata: [],
        config: {},
        index: 0,
        is_query: false,
        is_plain: false,
        is_query: false,
        is_plain: false,
        id_plain: id_plain || null,
        id_query: id_query || null
      }]
    }
  }


  const workbookSheet = sheetDataFullArr.map(sheetData => {
    const { sheet, name, fields, request, is_query, is_plain, id_plain, id_query } = sheetData;
    // { sheet_id: sheet || null, fullData: [] }

    if ((!is_query && !is_plain) || !request || request.length <= 0) {
      return {
        name: name || 'Hoja',
        color: '#53F',
        status: '1',
        order: '0',
        celldata: [],
        config: {},
        index: 0,
        sheet_id: sheet,
        is_query: false,
        is_plain: false,
        id_plain: id_plain || null,
        id_query: id_query || null
      }
    }

    // if (!request || request.length <= 0) return {
    //   name: name || 'Hoja1',
    //   color: '#53F',
    //   status: '1',
    //   order: '0',
    //   celldata: [],
    //   config: {},
    //   index: 0,
    //   sheet_id: sheet
    // }

    if (is_query) {
      const fieldArr = fields.map((req, indx) => {
        return {
          r: 0,
          c: indx,
          v: req
        }
      })
      const respArr = request.map((req, indx) => {
        const reqLen = Object.values(req);
        if (reqLen.length > 0) {
          return reqLen.map((fieldData, ind) => {
            const objRes = {
              r: indx + 1,
              c: ind,
              v: fieldData
            }
            return objRes
          })
        }
      })
      const fullData = [...fieldArr, ...respArr].flat()
      return {
        name: name,
        color: '#F3A712',
        status: '1',
        order: '0',
        celldata: fullData,
        config: {},
        index: 0,
        sheet_id: sheet,
        is_query: true,
        is_plain: false,
        id_plain: id_plain || null,
        id_query: id_query || null
      }
    }

    if (is_plain) {
      return {
        name: name,
        color: '#F3A712',
        status: '1',
        order: '0',
        celldata: request,
        config: {},
        index: 0,
        sheet_id: sheet,
        is_query: false,
        is_plain: true,
        id_plain: id_plain || null,
        id_query: id_query || null
      }
    }







  })

  return {
    id_project: id_project,
    arrSheet: workbookSheet
  }
}

