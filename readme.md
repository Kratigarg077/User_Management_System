# User Management System (Node.js + Express + MongoDB + EJS)

A simple **CRUD User Management Dashboard** built with **Node.js, Express, MongoDB, EJS and Bootstrap 5**.  
It allows you to **Create, Read, Update and Delete users** with a clean admin dashboard UI.

---

## Features

- Dashboard with user statistics
- Add new user
- View all users
- Single user detail view
- Update user
- Delete user (with confirmation)
- Clean Bootstrap UI
- MongoDB database integration
- EJS templating

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Frontend:** EJS, Bootstrap 5.2.3  
- **Template Engine:** EJS  

---

## Project Structure

```
project/
│
├── config/
│   └── db.js
│
├── models/
│   └── user_model.js
│
├── public/
│   ├── images/
│   └── users_data.json (for dummy data)
│
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   │
│   ├── home.ejs
│   ├── insertUser.ejs
│   ├── updateUser.ejs
│   ├── viewUser.ejs
│   └── singleViewUser.ejs
│
├── index.js
├── package.json
└── README.md
```

---

## Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/user-management.git
cd user-management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure MongoDB

Update **config/db.js**

```js
mongoose.connect("mongodb://127.0.0.1:27017/userdb");
```

Make sure MongoDB is running locally.

---

### 4. Run Application

```bash
node index.js or npm start
```

Server will start at:

```
http://localhost:4000 (specified port as 4000)
```

---

## Routes

| Route | Method | Description |
|-------|--------|------------|
| `/` | GET | Dashboard |
| `/view` | GET | View all users |
| `/insert` | GET | Insert form |
| `/insert` | POST | Save user |
| `/update?id=` | GET | Update form |
| `/update` | POST | Update user |
| `/delete` | POST | Delete user |
| `/singleView/:id` | GET | Single user view |

---

## CRUD Fields

- Name
- Email
- Phone
- Address

---

## Dependencies

```
express
ejs
mongodb / mongoose
nodemon (optional)
```

Install nodemon (optional):

```bash
npm install -g nodemon
nodemon index.js
```
