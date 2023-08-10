import { API_BASE_URL } from "../constants/dataConfig";

export const getQueryList = async () => {
  const url = `${API_BASE_URL}/query`;
  const res = await fetch(url);
  const { data } = await res.json()
  const { request } = data;
  return request;
}

export const getQuery = async (id) => {
  const url = `${API_BASE_URL}/query/${id}`;
  const res = await fetch(url);
  const { data } = await res.json()
  const { request } = data;
  return request;
}

export const createQuery = async (query) => {
  try {
    if (!query) throw new Error('Faltan datos.')
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    }
    const url = `${API_BASE_URL}/query`;
    const res = await fetch(url, options);
    const { data } = await res.json()
    const { request } = data;
    return request;
  } catch (error) {
    return false;
  }
}

export const updateQuery = async (id, query) => {
  try {
    if (!query || !id) throw new Error('Faltan datos.')
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    }
    const url = `${API_BASE_URL}/query/${id}`;
    const res = await fetch(url, options);
    const { success } = await res.json()
    return success;
  } catch (error) {
    return false;
  }
}