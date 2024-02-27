import * as assetModel from "../models/assetModel.js";

export const getAllEquipment = async (req, res) => {
  try {
    const { data, metadata } = await assetModel.getAllEquip();

    // Restructure results:
    const rowData = data.map((row) => {
      return {
        id: row.id,
        created: row.created_date,
        modified: row.modified_date,
        tagNumber: row.tag_number,
        name: row.name,
        make: row.make,
        model: row.model,
        description: row.description,
        rate: row.rate,
        rateUnit: row.rate_unit,
        cost: row.cost,
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

export const getAllRooms = async (req, res) => {
  try {
    const { data, metadata } = await assetModel.getAllRooms();

    // Manipulate rows
    const rowData = data.map((row) => {
      return {
        id: row.id,
        created: row.created_date,
        modified: row.modified_date,
        name: row.name,
        location: row.location,
        use: row.use,
        rate: row.rate,
        rateUnit: row.rate_unit,
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

export const getAllPersonel = async (req, res) => {
  try {
    const { data, metadata } = await assetModel.getAllPersonnel();

    // Manipulate rows
    const rowData = data.map((row) => {
      return {
        id: row.id,
        created: row.created_date,
        modified: row.modified_date,
        name: row.name,
        role: row.role,
        firstName: row.first_name,
        secondName: row.second_name,
        address: row.address,
        phoneNum: row.phone_number,
        email: row.email,
        rate: row.rate,
        rateUnit: row.rate_unit,
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

// export async function deleteEquip(req, res) {
//   try {
//     const deleteEquipQuery = {
//       text: `
//           DELETE FROM equipment
//           USING asset
//           WHERE equipment.id = asset.id AND asset.id = $1
//         `,
//       values: [req.params.id],
//     };
//     await pool.query(deleteEquipQuery);

//     const deleteAssetQuery = {
//       text: `
//             DELETE FROM asset
//             WHERE id = $1`,
//       values: [req.params.id],
//     };
//     await pool.query(deleteAssetQuery);

//     res.status(200).json({ message: 'Rows deleted successfully' });
//   } catch (err) {
//     console.error(`Error executing SQL query: `, err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

export async function deleteAsset(req, res) {
  try {
    const deleteAssetQuery = {
      text: `DELETE FROM asset 
      WHERE id = $1
      `,
      values: [req.params.id],
    };
    await pool.query(deleteAssetQuery);

    res.status(200).json({ message: "Rows deleted successfully" });
  } catch (err) {
    console.error(`Error executing SQL query: `, err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function addEquipment(req, res) {
  try {
    await pool.query("BEGIN");

    const insertAssetQuery = {
      text: `
      INSERT INTO asset(price, price_unit)
      VALUES($1, $2)
      RETURNING id
      `,
      values: [req.body.price, req.body.priceUnit],
    };

    // Insert new asset and get its ID
    const assetResult = await pool.query(insertAssetQuery);
    const assetId = assetResult.rows[0].id;

    // Now insert into correct asset category
    const insertEquipQuery = {
      text: `
      INSERT INTO equipment(id, make, model, description)
      VALUES($1, $2, $3, $4)
      `,
      values: [assetId, req.body.make, req.body.model, req.body.description],
    };

    await pool.query(insertEquipQuery);

    await pool.query("COMMIT");

    res.status(201).json({ message: "Rows added successfully" });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(`Error executing SQL query: ${err}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateAsset(req, res) {
  console.log(req.body);
  try {
    await pool.query("BEGIN");

    const editAssetQuery = {
      text: `
      UPDATE asset
      SET price = $1, price_unit = $2
      WHERE id=$3`,
      values: [req.body.price, req.body.priceUnit, req.params.id],
    };
    await pool.query(editAssetQuery);

    const editEquipQuery = {
      text: `UPDATE equipment
      SET make=$1, model=$2, description=$3
      WHERE id=$4`,
      values: [
        req.body.make,
        req.body.model,
        req.body.description,
        req.params.id,
      ],
    };
    await pool.query(editEquipQuery);
    await pool.query("COMMIT");
    res.status(201).json({ message: "Asset updated." });
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(`There was a problem executing SQL query: ${err}`);
  }
}
