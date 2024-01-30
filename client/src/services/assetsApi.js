import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
});

export async function fetchAssets({ queryKey }) {
  const category = queryKey[0];
  try {
    const res = await api.get(`api/assets/${category}`);
    console.log(res.data);
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
  }
}

export async function addAsset(category, data) {
  try {
    const res = await api.put(`api/assets/${category}`, data);
    return res.data;
  } catch (err) {
    console.error(`Error adding ${category}: ${err}`);
  }
}
