import { API_BASE_URL } from "../constants/dataConfig";

export const getSheetList = async () => {
  const url = `${API_BASE_URL}/sheet`;
  const res = await fetch(url);
  const { data } = await res.json()
  const { request } = data;
  return request;
}

export const getSheet = async (id) => {
  const url = `${API_BASE_URL}/sheet/${id}`;
  const res = await fetch(url);
  const { data } = await res.json()
  const { request } = data;
  return request;
}

export const createSheet = async (sheet) => {
  try {
    if (!sheet) throw new Error('Faltan datos.')
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sheet)
    }
    const url = `${API_BASE_URL}/sheet`;
    const res = await fetch(url, options);
    const { data } = await res.json()
    const { request } = data;
    return request;
  } catch (error) {
    return false;
  }
}