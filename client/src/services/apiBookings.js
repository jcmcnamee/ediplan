import axios from "axios";

const BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
});

export async function fetchBookings({ queryKey }) {
  try {
    const res = await api.get(`api/bookings`);
    return res.data;
  } catch (err) {
    console.error(`Error fetching bookings: ${err}`);
  }
}
