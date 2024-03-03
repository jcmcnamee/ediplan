CREATE TABLE booking (
  id SERIAL PRIMARY KEY,
  created_date TIMESTAMP NOT NULL,
  modified_date TIMESTAMP NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  production_id INTEGER,
  location_id INTEGER,
  provisional BOOL DEFAULT false,
  remote BOOL DEFAULT false,
  notes TEXT
);

CREATE TABLE booking_group (
  id SERIAL PRIMARY KEY,
  group_name VARCHAR(50)
);

CREATE TABLE booking_group_map (
  booking_id INTEGER,
  group_id INTEGER,
  PRIMARY KEY (booking_id,group_id)
);

CREATE TABLE location (
  id SERIAL PRIMARY KEY,
  name VARCHAR(75),
  description VARCHAR(255)
);

CREATE TABLE asset (
  id SERIAL PRIMARY KEY,
  created_date TIMESTAMP NOT NULL,
  modified_date TIMESTAMP NOT NULL,
  category VARCHAR(50),
  asset_name VARCHAR(255),
  rate NUMERIC(10,2),
  rate_unit VARCHAR(5),
  asset_value NUMERIC(10,2)
);

CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  asset_id INTEGER UNIQUE NOT NULL,
  job_title VARCHAR(75),
  address TEXT,
  phone_number VARCHAR(50),
  email VARCHAR(75),
  is_staff BOOL
);

CREATE TABLE room (
  id SERIAL PRIMARY KEY,
  asset_id INTEGER UNIQUE NOT NULL,
  use TEXT,
  notes TEXT
);

CREATE TABLE equipment (
  id SERIAL PRIMARY KEY,
  asset_id INTEGER UNIQUE NOT NULL,
  tag_number INTEGER UNIQUE,
  make VARCHAR(50),
  model VARCHAR(50),
  description TEXT
);

CREATE TABLE booking_asset_map (
  booking_id INTEGER,
  asset_id INTEGER,
  PRIMARY KEY (asset_id,booking_id)
);

CREATE TABLE asset_group (
  id SERIAL PRIMARY KEY,
  group_name VARCHAR(75)
);

CREATE TABLE group_asset_map (
  asset_id INTEGER,
  group_id INTEGER,
  PRIMARY KEY (asset_id,group_id)
);

CREATE TABLE production (
  id SERIAL PRIMARY KEY,
  prod_name VARCHAR(255),
  contact VARCHAR(50),
  contact_email VARCHAR(50),
  contact_number VARCHAR(15),
  notes TEXT
);

CREATE TABLE app_user (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(50),
  full_name VARCHAR(50),
  email VARCHAR(75),
  role VARCHAR(50) DEFAULT 'User',
  dark_mode BOOL DEFAULT false
);

-- RELATIONSHIPS

ALTER TABLE booking ADD FOREIGN KEY (production_id) REFERENCES production (id);

ALTER TABLE booking ADD FOREIGN KEY (location_id) REFERENCES location (id);

ALTER TABLE booking_group_map ADD FOREIGN KEY (booking_id) REFERENCES booking (id);

ALTER TABLE booking_group_map ADD FOREIGN KEY (group_id) REFERENCES booking_group (id);

ALTER TABLE person ADD FOREIGN KEY (asset_id) REFERENCES asset (id) ON DELETE CASCADE;

ALTER TABLE room ADD FOREIGN KEY (asset_id) REFERENCES asset (id) ON DELETE CASCADE;

ALTER TABLE equipment ADD FOREIGN KEY (asset_id) REFERENCES asset (id) ON DELETE CASCADE;

ALTER TABLE booking_asset_map ADD FOREIGN KEY (booking_id) REFERENCES booking (id);

ALTER TABLE booking_asset_map ADD FOREIGN KEY (asset_id) REFERENCES asset (id);

ALTER TABLE group_asset_map ADD FOREIGN KEY (asset_id) REFERENCES asset (id);

ALTER TABLE group_asset_map ADD FOREIGN KEY (group_id) REFERENCES asset_group (id);

-- CREATE INDEXES

CREATE INDEX ON person (asset_id);

CREATE INDEX ON room (asset_id);

CREATE INDEX ON equipment (asset_id);

-- CONSTRAINTS

-- IMPORT DATA
COPY asset (id, created_date, modified_date, category, asset_name, rate, rate_unit, asset_value)
FROM 'C:\Users\jcmcn\repo\ediplan\supporting files\asset.csv' DELIMITER ',' CSV HEADER;

-- Update the created_date and modified_date columns with the current TIMESTAMP
UPDATE asset
SET created_date = NOW(), modified_date = NOW();

COPY equipment (id,asset_id, tag_number, make, model, description)
FROM 'C:\Users\jcmcn\repo\ediplan\supporting files\equipment.csv' DELIMITER ',' CSV HEADER;

COPY room (id, asset_id, use, notes)
FROM 'C:\Users\jcmcn\repo\ediplan\supporting files\room.csv' DELIMITER ',' CSV HEADER;

COPY person (id, asset_id, job_title, address, phone_number, email, is_staff)
FROM 'C:\Users\jcmcn\repo\ediplan\supporting files\person.csv' DELIMITER ',' CSV HEADER;

-- CONTACT INFORMATION MAY BE REMOVED TO BE REPLACED BY "PERSON" ASSET.
COPY production (id, prod_name, contact, contact_email, contact_number, notes)
FROM 'C:\Users\jcmcn\repo\ediplan\supporting files\production.csv' DELIMITER ',' CSV HEADER;

COPY booking (id, created_date, modified_date, start_date, end_date, production_id, location_id, provisional, remote, notes)
FROM 'C:\Users\jcmcn\repo\ediplan\supporting files\booking.csv' DELIMITER ',' CSV HEADER;

UPDATE booking
SET created_date = NOW(), modified_date = NOW();


