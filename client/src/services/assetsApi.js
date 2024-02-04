import axios from 'axios';

// PUT INTO ENVIRONMENT VARIABLE
const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
});

export async function fetchAssets({ queryKey }) {
  const category = queryKey[0];
  try {
    const res = await api.get(`api/assets/${category}`);
    return res.data;
  } catch (err) {
    console.error(`Error fetching ${category}: ${err}`);
  }
}

export async function deleteAsset(id) {
  try {
    const res = await api.delete(`api/assets/${id}`);
    return res.data;
  } catch (err) {
    console.error('Error deleting data:', err);
    throw new Error(`Error deleting asset ${id}`);
  }
}

export async function addAsset(category, data) {
  try {
    console.log('addAsset category: ', category);
    console.log('addAsset data: ', data);
    const res = await api.put(`api/assets/${category}`, data);
    return res.data;
  } catch (err) {
    console.error(`Error adding ${category}: ${err}`);
    throw new Error(`Error adding ${category}`);
  }
}

export async function updateAsset(newData, id) {
  try {
    console.log(newData);
    const res = await api.patch(`api/assets/${id}`, newData);
    return res.data;
  } catch (err) {
    console.error(`Error updating ${newData.name || newData.model}: ${err}`);
    throw new Error(`Error updating ${newData.name || newData.model}`);
  }
}
