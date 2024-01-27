# Ediplan ✂🎥

## Summary

Ediplan is...

## Install guide

1. cd to project folder
2. type npm i
3. npm run dev

---

## Features

_Updated 17/01/2024_

🔴 = Not yet started | 🟡 = Started | 🟢 = Complete

#### Layout

🟡 Must have an intuitive and great looking layout

#### Dashboard

🔴 Display a dashboard with basic analytics

#### Asset lists

🔴 Allow user to CRUD assets <br>
🔴 Allow user to filter by property <br>
🔴 Allow user to search by property <br>
🔴 Nice to have: Allow user to assign asset to a group <br>
🔴 Each asset must be given a type: personel/room/equipment/misc <br>
🔴 Tabbed types <br>
🔴 Nice to have: Persistant associations between assets <br>

#### Nice to have: Groups

🔴 Allow creation of groups <br>
🔴

#### Bookings

🔴 Allow users to CRUD bookings <br>
🔴 Allow users to assign any type and number of assets to a booking <br>
🔴 Allow users to assign to a project <br>
🔴 Nice to have: Some kind of quote generator <br>

#### Timeline

🟡 Implement side scrolling timeline that displays bookings in lanes or 'tracks' for each asset type, group, or project. <br>
🔴 Allow users to plus and minus lanes chosing which asset to display from the current type <br>
🔴 Display a popup on hover showing booking details <br>
🔴 When clicking on a booking it should take the user to the bookings page <br>
🔴 Nice to have: Tabbed timelines for groups <br>

#### Dashboard

🔴 Implemenet some kind of utilisation statistics <br>
🔴 Display upcoming bookings/changes <br>

#### User

🔴 Include user authorization <br>
🔴 Dark mode option <br>
🔴 Nice to have: E-mail notification options <br>

#### Persistence

🟡 Front-end must be connected to a backend database (PostgreSQL) <br>

---

## Pages

- Landing page
- Login
- AppLayout
  - Dashboard
  - Timeline
  - Bookings
  - Assets
  - Groups
  - Settings
    - Email notification settings

---

## Tech stack

- React
- React Router
- React Query
- Styled Components
- Node.js
- Express
- PostgreSQL
- Axios
- react-table
- time-fns

---

## User guide

---

## Planning

### Database considerations

Tables:

1. Assets Table:

   - Attributes: UniqueID (Primary Key), Type, PricePerHour
   - This table holds common attributes for all assets.

<br>

2. PersonAttributes Table:

   - Attributes: UniqueID (Foreign Key referencing Assets), Name, Address
   - This table holds attributes specific to the "Person" asset type.

<br>

3. EquipmentAttributes Table:

   - Attributes: UniqueID (Foreign Key referencing Assets), Make, Model
   - This table holds attributes specific to the "Equipment" asset type.

<br>

4. RoomAttributes Table:
   - Attributes: UniqueID (Foreign Key referencing Assets), Size
   - This table holds attributes specific to the "Room" asset type.

#### Relationships:

- One-to-One Relationship:
  - Each entry in the Assets table corresponds to exactly one entry in either PersonAttributes, EquipmentAttributes, or RoomAttributes.
  - Use foreign keys in the specific attribute tables to link them to the Assets table.

#### Other Considerations:

1. Foreign Keys:

   - Each specific attribute table should have a foreign key referencing the Assets table.
   - This ensures that each entry in the attribute tables corresponds to a valid entry in the Assets table.

<br>

2. Joins:

   - When querying use JOIN operations to retrieve information about a specific asset type.
   - For efficiency it might be wise to index foreign keys and columns frequently used in joins.

<br>

1. Consistency:

   - Ensure data consistency by using transactions when updating related tables to maintain the integrity of the database.

<br>

4. Data Validation:

   - Implement checks and constraints to ensure that data entered adheres to the expected format and types.

<br>

5. Documentation:

   - Clearly document the relationships, foreign keys, and any constraints for future reference.

<br>

6. Testing:

   - Thoroughly test the database design with sample data to ensure that it meets your requirements and performs well.

### Data strctures

Each asset will need to be assigned a type on creation to account for different real world properties. Types will be analagous to predefined groups.

```
Class Asset {
    name: '',
    id: '',
    type: '',
    groups: [],
    isAvailable: true,
    pricePerHour: 0,

    // Methods
    book(startDate, endDate) {},
    checkAvailability(startDate, endDate) {},
}

Class Booking {
    id: 0,
    startDate: {}, // Format yet to be defined
    endDate: {},
    duration: 0, // Could this be derived?
    productionName: '',
    assets: [{}],
    guests: [''],
}
```
