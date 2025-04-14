# Open street Maps

It is an interactive full-stack application that allows users to search for, add, and review locations on a live map. Built using React with TypeScript (frontend) and Node.js + Express + MongoDB (backend), it’s ideal for college campuses or local guides where location discovery and user input are essential.

---

## Features

- JWT Authentication  
  Secure login/signup flow with token validation.

- Interactive Leaflet Map  
  - Search for any place using OpenStreetMap (Nominatim API)  
  - Click on the map to add custom markers

- Add Locations with Reviews  
  - Input location name and a custom review  
  - Markers are saved to the database and displayed to all users

- View Reviews
  Click on any marker to view detailed reviews for that location.

---

## Tech Stack

| Layer        | Tech                             |
|--------------|----------------------------------|
| Frontend     | React, TypeScript, Leaflet.js    |
| Backend      | Node.js, Express, MongoDB        |
| Auth         | JWT Tokens                       |
| Map Search   | OpenStreetMap (Nominatim API)    |
| Styling      | CSS with inline enhancements     |
| API Client   | Axios                            |

---

## Project Structure

```
campus-compass/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── components/
│   │   ├── MapView.tsx
│   │   ├── SearchBar.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── App.tsx
│   └── main.tsx
└── README.md
```

---



## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Utk1896/campus-compass.git
cd campus-compass
```

### 2. Install Dependencies

#### Frontend
```bash
cd campus-compass-frontend
npm install
```

#### Backend
```bash
cd campus-compass-backend
npm install
```

---

## ▶️ Running the App

### Start Backend
```bash
cd backend
npm run dev
```

### Start Frontend
```bash
cd ../frontend
npm run dev
```

Open `http://localhost:5173` to access the application.

---

## 🔑 Environment Variables

Create a `.env` file in the `/backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## API Endpoints

### Auth Routes

- `POST /api/auth/signup` → Register a new user  
- `POST /api/auth/login` → Authenticate user and return token

### Location Routes

- `GET /api/locations` → Fetch all saved locations  
- `POST /api/locations` → Save a new location + review

---

## 🔍 Core Components

### 📍 `MapView.tsx`
- Renders Leaflet map centered around Shimla (`[31.1048, 77.1734]`)
- Integrates:
  - Search using OSM API
  - Add marker by clicking map
  - Display saved locations with popups
  - Dynamic fly-to animation

### 🔍 `SearchBar.tsx`
- Controlled input for location names
- Calls geolocation API and updates map view

###  `Login.tsx` & `Signup.tsx`
- Simple UI forms
- Posts to auth API routes
- Stores JWT token in localStorage

---

Usage Instructions

1. 📝 Sign Up / Log In  
   You'll be redirected to the map after login.

2. 🔍 Search Location
   Use the search bar to move around the map.

3. 🖱️ Add Marker 
   Click anywhere on the map to open the "Add a Location" popup.

4. Fill the Form  
   Provide:
   - Location Name (⭐ required)
   - Review (⭐ required)  
   Submit to store it in the database.

5. View Saved Locations  
   Click any marker to read the name and review.

### Screenshots
Map Page
![image](https://github.com/user-attachments/assets/01bf851d-4d05-49c1-b6be-9893a3df24ec)
Login Page
![image](https://github.com/user-attachments/assets/92a4f6cf-dc67-4afd-b0f2-c1511ca24b82)
Signup Page
![image](https://github.com/user-attachments/assets/7e85e56a-49c4-457f-9d0e-131236e483d5)
