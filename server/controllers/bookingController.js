import * as bookingModel from "../models/bookingModel.js";

export const getAllBookings = async (req, res) => {
  try {
    const { data, metadata } = await bookingModel.getAllBookings();

    const rowData = data.map((row) => {
      return {
        id: row.id,
        productionName: row.prod_name,
        created: row.created_date,
        modified: row.modified_date,
        startDate: row.start_date,
        endDate: row.end_date,
        productionId: row.production_id,
        locationId: row.location_id,
        locationName: row.locationName, // Might need "??"
        isProvisional: row.provisional,
        isRemote: row.remote,
        notes: row.notes,
      };
    });

    const result = {
      rowData,
      metadata,
    };

    res.send(JSON.stringify(result));
  } catch (err) {
    console.error(`Error executing SQL query: `, err);
    res.status(500).json({ error: "Internal server error" });
  }
};
