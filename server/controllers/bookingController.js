import * as bookingModel from "../models/bookingModel.js";

export const getAllBookings = async (req, res) => {
  try {
    const { data, metadata } = await bookingModel.getAllBookings();

    const rowData = data.map((row) => {
      return {
        id: row.id,
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
