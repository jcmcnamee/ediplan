CREATE TABLE "booking" (
  "id" int PRIMARY KEY,
  "created_date" timestamp NOT NULL,
  "modified_date" timestamp NOT NULL,
  "type" varchar(50),
  "start_date" timestamp NOT NULL,
  "end_date" timestamp NOT NULL,
  "production_id" int,
  "location_id" int,
  "provisional" bool DEFAULT false,
  "remote" bool DEFAULT false,
  "comment" text
);

CREATE TABLE "booking_type" (
  "id" int PRIMARY KEY,
  "name" varchar(50)
);

CREATE TABLE "booking_type_map" (
  "booking_id" int,
  "type_id" int,
  PRIMARY KEY (booking_id,type_id)
);

CREATE TABLE "location" (
  "id" int PRIMARY KEY,
  "description" varchar(255)
);

CREATE TABLE "asset" (
  "id" int PRIMARY KEY,
  "created_date" timestamp NOT NULL,
  "modified_date" timestamp NOT NULL,
  "rate" numeric(10,2),
  "rate_unit" varchar(5),
  "cost" numeric(10,2)
);

CREATE TABLE "person" (
  "id" int PRIMARY KEY,
  "asset_id" int,
  "role" varchar(75),
  "name" varchar(50),
  "address" text,
  "phone_number" varchar(50),
  "email" varchar(75)
);

CREATE TABLE "room" (
  "id" int PRIMARY KEY,
  "asset_id" int UNIQUE NOT NULL,
  "name" varchar(50),
  "location" text,
  "use" text
);

CREATE TABLE "equipment" (
  "id" int PRIMARY KEY,
  "asset_id" int UNIQUE NOT NULL,
  "asset_number" int,
  "make" varchar(50),
  "model" varchar(50),
  "description" text
);

CREATE TABLE "booking_asset_map" (
  "booking_id" int,
  "asset_id" int,
  PRIMARY KEY (asset_id,booking_id)
);

CREATE TABLE "group" (
  "id" int PRIMARY KEY,
  "name" varchar(75)
);

CREATE TABLE "group_asset_map" (
  "asset_id" int,
  "group_id" int,
  PRIMARY KEY (asset_id,group_id)
);

CREATE TABLE "production" (
  "id" int PRIMARY KEY,
  "name" varchar(255),
  "contact" varchar(50),
  "contact_email" varchar(50),
  "contact_number" varchar(15),
  "notes" text
);

CREATE TABLE "app_user" (
  "id" int PRIMARY KEY,
  "username" varchar(50),
  "password" varchar(50),
  "name" varchar(50),
  "email" varchar(75),
  "role" varchar(50) DEFAULT 'User',
  "dark_mode" bool DEFAULT false
);

-- RELATIONSHIPS

ALTER TABLE "booking" ADD FOREIGN KEY ("production_id") REFERENCES "production" ("id");

ALTER TABLE "booking" ADD FOREIGN KEY ("location_id") REFERENCES "location" ("id");

ALTER TABLE "booking_type_map" ADD FOREIGN KEY ("booking_id") REFERENCES "booking" ("id");

ALTER TABLE "booking_type_map" ADD FOREIGN KEY ("type_id") REFERENCES "booking_type" ("id");

ALTER TABLE "person" ADD FOREIGN KEY ("asset_id") REFERENCES "asset" ("id") ON DELETE CASCADE;

ALTER TABLE "room" ADD FOREIGN KEY ("asset_id") REFERENCES "asset" ("id") ON DELETE CASCADE;

ALTER TABLE "equipment" ADD FOREIGN KEY ("asset_id") REFERENCES "asset" ("id") ON DELETE CASCADE;

ALTER TABLE "booking_asset_map" ADD FOREIGN KEY ("booking_id") REFERENCES "booking" ("id");

ALTER TABLE "booking_asset_map" ADD FOREIGN KEY ("asset_id") REFERENCES "asset" ("id");

ALTER TABLE "group_asset_map" ADD FOREIGN KEY ("asset_id") REFERENCES "asset" ("id");

ALTER TABLE "group_asset_map" ADD FOREIGN KEY ("group_id") REFERENCES "group" ("id");

-- CREATE INDEXES

CREATE INDEX ON person (asset_id);

CREATE INDEX ON room (asset_id);

CREATE INDEX ON equipment (asset_id);

-- CONSTRAINTS


