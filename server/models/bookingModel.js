import { query, getClient } from "../config/db.js";

export async function getAllBookings() {
  try {
    const { rows: data } = await query(`
            SELECT booking.*, production.name, location.description,
            FROM booking
            INNER JOIN production ON booking.production_id = production.id
            INNER JOIN location ON booking.location_id = location.id;
        `);

    const { rows: metadata } = await query(`
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name IN ('booking', 'production', 'location')
        `);

    const response = {
      data,
      metadata,
    };

    return response;
  } catch (err) {
    console.error(`Error executing SQL query: `, err);
    throw new Error(err);
  }
}
