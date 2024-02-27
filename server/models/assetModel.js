import { query, getClient } from "../config/db.js";

export async function getAllEquip() {
  try {
    // SQL query to select all columns from the joined table
    const { rows: data } = await query(`
    SELECT *
    FROM asset
    INNER JOIN equipment
    ON asset.id = equipment.id
    ORDER BY asset.id ASC
  `);

    // Fetch metadata for the joined table
    const { rows: metadata } = await query(`
     SELECT column_name, data_type
     FROM information_schema.columns
     WHERE table_name IN ('asset', 'equipment')
   `);

    // Package data and metadata in a single object
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

export async function getAllRooms() {
  try {
    // SQL query to select all columns from the joined table
    const { rows: data } = await query(`
    SELECT *
    FROM asset
    INNER JOIN room
    ON asset.id = room.id
    ORDER BY asset.id ASC
  `);

    // Fetch metadata for the joined table
    const { rows: metadata } = await query(`
     SELECT column_name, data_type
     FROM information_schema.columns
     WHERE table_name IN ('asset', 'room')
   `);

    // Package data and metadata in a single object
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

export async function getAllPersonnel() {
  try {
    // SQL query to select all columns from the joined table
    const { rows: data } = await query(`
        SELECT *
        FROM asset
        INNER JOIN person
        ON asset.id = person.id
        ORDER BY asset.id ASC
      `);

    // Fetch metadata for the joined table
    const { rows: metadata } = await query(`
         SELECT column_name, data_type
         FROM information_schema.columns
         WHERE table_name IN ('asset', 'person')
       `);

    // Package data and metadata in a single object
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

export async function getAsset(id) {}

export async function deleteAsset(id) {
  try {
    const text = `
        DELETE FROM asset 
        WHERE id = $1
        `;
    const params = [id];

    await query(text, params);
  } catch (err) {
    console.error(`Error executing SQL query: `, err);
    throw new Error(err);
  }
}

export async function createAsset(data) {
  const { category, rate, rateUnit, cost } = data;

  // Get client to perform transaction
  const client = await getClient();

  try {
    // Start transaction
    await client.query("BEGIN");

    const result = await client.query(
      `
        INSERT INTO asset(category, rate, rate_unit, cost)
        VALUES($1, $2, $3, $4)
        RETURNING id`,
      [category, rate, rateUnit, cost]
    );

    const assetId = result.rows[0].id;

    if (category === "equip") {
      const { assetTag, make, model, description } = data;
      await client.query(
        `
            INSERT INTO equipment(asset_id, tag_number, make, model, description)
            VALUES($1, $2, $3, $4, $5)`,
        [assetId, assetTag, make, model, description]
      );
    }
    if (category === "rooms") {
      const { name, location, use } = data;
      await client.query(
        `
            INSERT INTO room(asset_id, name, location, use)
            VALUES($1, $2, $3, $4)
            `,
        [assetId, name, location, use]
      );
    }
    if (category === "person") {
      const { role, firstName, secondName, address, phoneNum, email } = data;
      await client.query(
        `
            INSERT INTO person(asset_id, role, first_name, second_name, address, phone_number, email)
            VALUES($1, $2, $3, $4, $5, $6, $7)`,
        [assetId, role, firstName, secondName, address, phoneNum, email]
      );
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(`Error executing SQL query: `, err);
    throw new Error(err);
  } finally {
    client.release();
  }
}

export async function updateAsset(id, data) {
  const { category, rate, rateUnit, cost } = data;
  console.log(`Data received at model: `, { id, data });

  // Get client to perform transaction
  const client = await getClient();

  try {
    // Start transaction
    await client.query("BEGIN");

    await client.query(
      `
        UPDATE asset
        SET rate = $1, rate_unit = $2, cost = $3
        WHERE id=$4
        `,
      [rate, rateUnit, cost, id]
    );

    if (category === "equip") {
      console.log("UPDATE EQUIP");
      const { assetTag, make, model, description } = data;
      await client.query(
        `
            UPDATE equipment
            SET tag_number=$1, make=$2, model=$3, description=$4
            WHERE asset_id=$5
            `,
        [assetTag, make, model, description, id]
      );
    }
    if (category === "room") {
      const { name, location, use } = data;
      await client.query(
        `
            UPDATE room
            SET name=$1, location=$2, use=$3
            WHERE asset_id=$4
            `,
        [name, location, use, id]
      );
    }
    if (category === "person") {
      const { role, firstName, secondName, address, phoneNum, email } = data;
      await client.query(
        `
            UPDATE person
            SET role = $1, first_name = $2, second_name = $3, address = $4, phone_number = $5, email = $6
            WHERE asset_id = $7
            `,
        [role, firstName, secondName, address, phoneNum, email, id]
      );
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(`Error executing SQL query: `, err);
    throw new Error(err);
  } finally {
    client.release();
  }
}
