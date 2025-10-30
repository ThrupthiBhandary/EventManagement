

---

````markdown
# 🎫 Synergia Event Booking API

This project is part of **Assignment 2** — extending the previous Synergia Event Booking API by integrating **MongoDB** for persistent storage and implementing full **CRUD operations** with **filtering** and **search** features.

---

## 🚀 Features

✅ Connects **Node.js** + **Express** API to **MongoDB** using **Mongoose**  
✅ Performs **CRUD** operations on bookings  
✅ Supports **search** by email and **filtering** by event  
✅ Validates required fields: `name`, `email`, and `event`  
✅ Follows proper **REST API standards** and uses appropriate status codes  

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (via Mongoose)  
- **Environment Variables:** dotenv  

---

## 📂 Project Setup

### 1️⃣ Clone the repository
```bash
git clone <your-repo-url>
cd assignment2
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up environment variables

Create a `.env` file in the root folder and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_url
```

### 4️⃣ Run the server

```bash
node app.js
```

Server will start on:

```
http://localhost:3000
```

---

## 📚 API Endpoints

| Method     | Endpoint                              | Description              |
| ---------- | ------------------------------------- | ------------------------ |
| **GET**    | `/api/bookings`                       | Retrieve all bookings    |
| **POST**   | `/api/bookings`                       | Create a new booking     |
| **GET**    | `/api/bookings/:id`                   | Get booking by ID        |
| **PUT**    | `/api/bookings/:id`                   | Update booking details   |
| **DELETE** | `/api/bookings/:id`                   | Delete/cancel booking    |
| **GET**    | `/api/bookings/search?email=xyz`      | Search bookings by email |
| **GET**    | `/api/bookings/filter?event=Synergia` | Filter bookings by event |

---

## 🧩 Example .env File

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/
```

---

## 🧠 Schema Overview

```javascript
{
  name: String,
  email: String,
  event: String,
  ticketType: String,
  createdAt: { type: Date, default: Date.now }
}
```

