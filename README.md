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

🔴 Allow user to CRUD assets
🔴 Allow user to filter by property
🔴 Allow user to search by property
🔴 Nice to have: Allow user to assign asset to a group
🔴 Each asset must be given a type: personel/room/equipment/misc
🔴 Tabbed types
🔴 Nice to have: Persistant associations between assets

#### Nice to have: Groups

🔴 Allow creation of groups
🔴

#### Bookings

🔴 Allow users to CRUD bookings
🔴 Allow users to assign any type and number of assets to a booking
🔴 Allow users to assign to a project
🔴 Nice to have: Some kind of quote generator

#### Timeline

🔴 Implement side scrolling timeline that displays bookings in lanes or 'tracks' for each asset type, group, or project.
🔴 Allow users to plus and minus lanes chosing which asset to display from the current type
🔴 Display a popup on hover showing booking details
🔴 When clicking on a booking it should take the user to the bookings page
🔴 Nice to have: Tabbed timelines for groups

#### Dashboard

🔴 Implemenet some kind of utilisation statistics
🔴 Display upcoming bookings/changes

#### User

🔴 Include user authorization
🔴 Dark mode option
🔴 Nice to have: E-mail notification options

#### Persistence

🟡 Front-end must be connected to a backend database (PostgreSQL)

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
-

#### NPM modules

- react-table
- luxon

---

## User guide

---

## Planning

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
