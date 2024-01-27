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
    const result = await db.query(query);
    res.send(JSON.stringify(result.rows));
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
    const result = await db.query(query);
    res.send(JSON.stringify(result.rows));
  } catch (err) {
    console.error(`Error executing SQL query: `, err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllPersons = async (req, res) => {
  try {
    const query = `
    SELECT *
    FROM asset
    LEFT JOIN room
    ON asset.id = person.id
    `;
    const result = await db.query(query);
    res.send(JSON.stringify(result.rows));
  } catch (err) {
    console.error(`Error executing SQL query: `, err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export async function deleteEquip(req, res) {
  try {
    const deleteEquipQuery = {
      text: `
          DELETE FROM equipment
          USING asset
          WHERE equipment.id = asset.id AND asset.id = $1
        `,
      values: [req.params.id],
    };
    await db.query(deleteEquipQuery);

    const deleteAssetQuery = {
      text: `
            DELETE FROM asset
            WHERE id = $1`,
      values: [req.params.id],
    };
    await db.query(deleteAssetQuery);

    res.status(200).json({ message: 'Rows deleted successfully' });
  } catch (err) {
    console.error(`Error executing SQL query: `, err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
