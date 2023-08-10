import { API_BASE_URL } from "../constants/dataConfig";

export const getTableList = async () => {
  const url = `${API_BASE_URL}/data_table`;
  const res = await fetch(url);
  const { data } = await res.json()
  const { request } = data;
  return request;
}

export const getTable = async (id) => {
  const url = `${API_BASE_URL}/data_table/${id}`;
  const res = await fetch(url);
  const { data } = await res.json()
  const { request } = data;
  return request;
}

// export const createTable = async (data_table) => {
//   try {
//     if (!comfach) throw new Error('Faltan datos.')
//     const options = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data_table)
//     }
//     const url = `${API_BASE_URL}/`;
//     const res = await fetch(url, options);
//     const { data } = await res.json()
//     const { request } = data;
//     return request;
//   } catch (error) {
//     return false;
//   }
// }