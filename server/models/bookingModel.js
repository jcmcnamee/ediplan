import { query } from "../config/db.js";

export async function getAllBookings() {
  try {
    const { rows: data } = await query(`
            SELECT booking.*, production.prod_name, location.description AS loc_description
            FROM booking
            LEFT JOIN production ON booking.production_id = production.id
            LEFT JOIN location ON booking.location_id = location.id
            ORDER BY start_date ASC
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
