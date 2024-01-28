import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
});

export async function fetchEquip() {
  try {
    const res = await api.get('api/assets/equip');
    return res.data;
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

export async function deleteEquip(id) {
  try {
    const res = await api.delete(`api/assets/${id}`);
    return res.data;
  } catch (err) {
    console.error('Error deleting data:', err);
  }
}

export async function addEquip (data){
  try{
    const res = await api.put(`api/assets/equip`, data)
    return res.data;
  }catch(err){
    console.error(err);
  }
}

// export const fetchRoom = async () => {
//   try {
//     const res = await api.get('api/assets/room');
//     return res.data;
//   } catch (err) {
//     console.error('Error fetching data:', err);
//   }
// };

// export const fetchPerson = async () => {
//   try {
//     const res = await api.get('api/assets/person');
//     return res.data;
//   } catch (err) {
//     console.error('Error fetching data:', err);
//   }
// };
