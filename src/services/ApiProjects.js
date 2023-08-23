import { BASE_URL } from "../../environment";

export const getProjectList = async () => {
  const url = "http://localhost:9090/project";
  const res = await fetch(url);
  const { data } = await res.json()
  const { request } = data;
  return request;
}

export const getProject = async (id) => {
  const url = `${BASE_URL}/project/${id}`;
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
    const url = `${BASE_URL}/project`;
    const res = await fetch(url, options);
    const { data } = await res.json()
    const { request } = data;
    return request;
  } catch (error) {
    return false;
  }
}