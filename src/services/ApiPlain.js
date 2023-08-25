import { API_BASE_URL } from "../constants/dataConfig";

export const getPlainList = async () => {
  const url = `${API_BASE_URL}/plain`;
  const res = await fetch(url);
  const { data } = await res.json()
  const { request } = data;
  return request;
}

export const getPlain = async (id) => {
  const url = `${API_BASE_URL}/plain/${id}`;
  const res = await fetch(url);
  const { data } = await res.json()
  const { request } = data;
  return request;
}

export const createPlain = async (plain) => {
  try {
    if (!plain) throw new Error('Faltan datos.')
    console.log(JSON.stringify(plain));
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plain)
    }
    const url = `${API_BASE_URL}/plain`;
    const res = await fetch(url, options);
    const { data } = await res.json()
    const { request } = data;
    return request;
  } catch (error) {
    return false;
  }
}

export const updatePlain = async (dataPlain, id) => {
  try {
    if (!dataPlain) throw new Error('Faltan datos.')
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataPlain)
    }
    const url = `${API_BASE_URL}/plain/${id}`;
    const res = await fetch(url, options);
    const { data } = await res.json()
    const { request } = data;
    return request;
  } catch (error) {
    return false;
  }
}