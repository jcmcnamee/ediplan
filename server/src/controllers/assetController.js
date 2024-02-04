import { db } from '../../server.js';

export const getAllEquipment = async (req, res) => {
  try {
    const query = `
    SELECT *
    FROM asset
    INNER JOIN equipment
    ON asset.id = equipment.id
    ORDER BY asset.id ASC
    `;
    const data = await db.query(query);

    // Restructure results:
    const result = data.rows.map(row => {
      return {
        id: row.id,
        make: row.make,
        model: row.model,
        description: row.description,
        price: row.price,
        priceUnit: row.price_unit,
      };
    });

    res.send(JSON.stringify(result));
  } catch (err) {
    console.error(`Error executing SQL query: `, err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const query = `
    SELECT *
    FROM asset
    INNER JOIN room
    ON asset.id = room.id
    `;
    const data = await db.query(query);

    // Manipulate rows
    const result = data.rows.map(row => {
      return {
        id: row.id,
        name: row.name,
        location: row.location,
        use: row.use,
        cost: `£${row.price} p/${row.price_unit}`,
      };
    });

    res.send(JSON.stringify(result));
  } catch (err) {
    console.error(`Error executing SQL query: `, err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllPersonel = async (req, res) => {
  try {
    const query = `
    SELECT *
    FROM asset
    INNER JOIN personel
    ON asset.id = personel.id
    `;
    const data = await db.query(query);

    const result = data.rows.map(row => {
      return {
        id: row.id,
        name: `${row.first_name} ${row.second_name}`,
        address: row.address,
        phone: row.phone_number,
        email: row.email,
        rate: `£${row.price} p/${row.price_unit}`,
      };
    });

    res.send(JSON.stringify(result));
  } catch (err) {
    console.error(`Error executing SQL query: `, err);
    res.status(500).json({ error: 'Internal server error' });
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
//     await db.query(deleteEquipQuery);

//     const deleteAssetQuery = {
//       text: `
//             DELETE FROM asset
//             WHERE id = $1`,
//       values: [req.params.id],
//     };
//     await db.query(deleteAssetQuery);

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
    await db.query(deleteAssetQuery);

    res.status(200).json({ message: 'Rows deleted successfully' });
  } catch (err) {
    console.error(`Error executing SQL query: `, err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function addEquipment(req, res) {
  try {
    await db.query('BEGIN');

    const insertAssetQuery = {
      text: `
      INSERT INTO asset(price, price_unit)
      VALUES($1, $2)
      RETURNING id
      `,
      values: [req.body.price, req.body.priceUnit],
    };

    // Insert new asset and get its ID
    const assetResult = await db.query(insertAssetQuery);
    const assetId = assetResult.rows[0].id;

    // Now insert into correct asset category
    const insertEquipQuery = {
      text: `
      INSERT INTO equipment(id, make, model, description)
      VALUES($1, $2, $3, $4)
      `,
      values: [assetId, req.body.make, req.body.model, req.body.description],
    };

    await db.query(insertEquipQuery);

    await db.query('COMMIT');

    res.status(201).json({ message: 'Rows added successfully' });
  } catch (err) {
    await db.query('ROLLBACK');
    console.error(`Error executing SQL query: ${err}`);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateAsset(req, res) {
  console.log(req.body);
  try {
    await db.query('BEGIN');

    const editAssetQuery = {
      text: `
      UPDATE asset
      SET price = $1, price_unit = $2
      WHERE id=$3`,
      values: [req.body.price, req.body.priceUnit, req.params.id],
    };
    await db.query(editAssetQuery);

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
    await db.query(editEquipQuery);
    await db.query('COMMIT');
    res.status(201).json({ message: 'Asset updated.' });
  } catch (err) {
    await db.query('ROLLBACK');
    console.error(`There was a problem executing SQL query: ${err}`);
  }
}
