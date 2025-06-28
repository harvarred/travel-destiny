# 🌍 TravelDestiny - Fullstack Travel Site

**TravelDestiny** is a fullstack travel destination site built using **React (Vite)** for the frontend, **Node.js + Express** for the backend, and **MongoDB** for the database. It allows users to view, search, add, update, and delete travel destinations and their famous sites.

---

## 🧰 Tech Stack

- **Frontend:** React + Bootstrap + Axios
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (using Mongoose)
- **Tooling:** Vite, Postman (for testing), Git, GitHub

---

## 🧭 Project Workflow

### 1. **Backend Setup**

- Created an Express server (`index.js`)
- Connected MongoDB via Mongoose
- Defined models:
  - `Destination` model with:
    - destinationname
    - description
    - image
    - sites: array of objects (name & image)
- Built CRUD routes:
  - `GET /destinations`
  - `POST /destinations`
  - `PUT /destinations/:id`
  - `DELETE /destinations/:id`

### 2. **Frontend Setup (React + Vite)**

- Used `Vite` to scaffold the project.
- Setup folder structure:
-  src/

├── components/

│   ├── Navbar.jsx

│   ├── DestinationCard.jsx

│   ├── SiteCard.jsx

│   └── AddDestinationForm.jsx

├── pages/

│   └── Home.jsx

├── api.js

├── App.jsx

└── main.jsx


### 3. **Functionality Implemented**

- Homepage displays all destinations as cards.
- Each card shows:
- Destination name, image, description
- List of site names (not images)
- **Edit** and **Delete** buttons
- Search bar (in Navbar):
- If a destination name is searched → shows matching site's names and images.
- Add destination:
- Via a `+` card at the end of all destinations.
- Edit destination:
- Directly editable inside the card itself.
- No separate form.
- Delete:
- Removes destination from database.

---

## ⚙️ Installation Instructions

### 📦 Backend and Frontend

```bash
cd backend
npm install
npm start

cd frontend
npm install
npm run dev

---
