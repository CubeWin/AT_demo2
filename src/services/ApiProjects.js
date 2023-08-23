import { API_BASE_URL } from "../constants/dataConfig";

export const getProjectList = async () => {
  const url = `${API_BASE_URL}/project`;
  const res = await fetch(url);
  const { data } = await res.json()
  const { request } = data;
  return request;
}

export const getProject = async (id) => {
  const url = `${API_BASE_URL}/project/${id}`;
  const res = await fetch(url);
  const { data } = await res.json()
  const { request } = data;
  return request;
}

export const createProject = async (project) => {
  try {
    if (!project) throw new Error('Faltan datos.')
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    }
    const url = `${API_BASE_URL}/project`;
    const res = await fetch(url, options);
    const { data } = await res.json()
    const { request } = data;
    return request;
  } catch (error) {
    return false;
  }
}