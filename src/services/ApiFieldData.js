import { API_BASE_URL } from "../constants/dataConfig";

export const getFieldList = async () => {
  const url = `${API_BASE_URL}/data_field`;
  const res = await fetch(url);
  const { data } = await res.json()
  const { request } = data;
  return request;
}

export const getField = async (id) => {
  const url = `${API_BASE_URL}/data_field/${id}`;
  const res = await fetch(url);
  const { data } = await res.json()
  const { request } = data;
  return request;
}
