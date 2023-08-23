import { API_BASE_URL } from "../constants/dataConfig";

export const getDataQuery = async (id_project) => {
  const url = `${API_BASE_URL}/command/${id_project}`;
  const res = await fetch(url);
  const { data } = await res.json()
  const { request, fields, sheet } = data;
  if (!request) return { sheet_id: sheet || null, fullData: [] }

  console.log(`after: ${!request}`);
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
  return { sheet_id: sheet || null, fullData }
}

