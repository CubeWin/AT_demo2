import { API_BASE_URL } from "../constants/dataConfig";

export const getQueryField = async (id) => {
  const url = `${API_BASE_URL}/query/${id}`;
  const res = await fetch(url);
  const { data } = await res.json()
  const { request } = data;
  return request;
}

export const createQueryField = async (queryField) => {
  try {
    if (!queryField) throw new Error('Faltan datos.')
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(queryField)
    }
    const url = `${API_BASE_URL}/queryField`;
    const res = await fetch(url, options);
    const { data } = await res.json()
    const { request } = data;
    return request;
  } catch (error) {
    return false;
  }
}