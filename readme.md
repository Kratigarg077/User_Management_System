# User Management System

A full-featured CRUD User Management Dashboard with Authentication, Session Management, and File Upload UI built with Node.js, Express, MongoDB, EJS, Bootstrap 5 and Font Awesome.

Allows users to Register, Login, and Manage user records with profile photos, clean responsive UI, and comprehensive dashboard.

---

## Features

### Authentication & Security
- User registration (signup) with password hashing (bcryptjs)
- Secure login with session management
- Password confirmation validation
- Session-based authentication
- Logout functionality
- Forgot password route (UI ready for implementation)
- Protected routes with authentication middleware

### Dashboard & User Management
- Dashboard with user statistics
- Total users count
- Latest user display
- Add new users with form validation
- View all users in responsive table
- View single user details with profile photo
- Update user information
- Delete users with confirmation
- Profile photo upload UI (ready for Multer)

### UI/UX Features
- Responsive Bootstrap 5.3.8 design
- Teal theme (#39A6A3) matching navbar
- Font Awesome 6.4.0 icons throughout
- Centralized CSS styling
- Professional card-based layouts
- Mobile-friendly interface
- Consistent color scheme across all pages

### File Management
- Profile photo upload UI in insert/update forms
- Profile photo display in table view (circular 50x50px)
- Profile photo display in single user detail view (150x150px circular)
- Placeholder icons when no photo uploaded
- Responsive image handling

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Backend | Node.js 18+, Express.js 4.x |
| Database | MongoDB, Mongoose 7.x |
| Frontend | EJS Templating, Bootstrap 5.3.8 |
| Icons | Font Awesome 6.4.0 |
| Authentication | bcryptjs, express-session |
| File Upload | Multer |
| Styling | Bootstrap 5.3.8, Custom CSS |

---

## Project Structure

```
crud_ejs/
├── config/
│   └── db.js                      # MongoDB connection
├── models/
│   └── user_model.js              # User schema and model
├── routes/
│   └── routes.js                  # All application routes
├── public/
│   ├── css/
│   │   └── style.css              # Centralized CSS styling
│   ├── uploads/                   # Profile photos storage
│   ├── images/                    # App images
│   └── users_data.json            # Dummy data
├── views/
│   ├── partials/
│   │   ├── header.ejs             # Top header with user info & logout
│   │   ├── navbar.ejs             # Sidebar navigation
│   │   └── footer.ejs             # Footer section
│   ├── auth/
│   │   ├── login.ejs              # Login form
│   │   ├── signup.ejs             # Registration form
│   │   └── forgotPass.ejs         # Password reset form
│   ├── home.ejs                   # Dashboard
│   ├── insertUser.ejs             # Add new user form
│   ├── viewUser.ejs               # Users list table
│   ├── singleViewUser.ejs         # Single user detail
│   ├── updateUser.ejs             # Update user form
│   └── deleteUser.ejs             # Delete confirmation
├── index.js                       # Main entry point
├── package.json                   # Dependencies
└── README.md                      # This file
```

---

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Steps

1. Clone the repository
```bash
git clone https://github.com/Kratigarg077/User_Management_System.git
cd crud_ejs
```

2. Install dependencies
```bash
npm install express mongoose bcryptjs express-session ejs multer
npm install --save-dev nodemon
```

3. Configure MongoDB
- Edit `config/db.js` with your MongoDB connection string
- Default: `mongodb://127.0.0.1:27017/crud_app`

4. Start the server
```bash
npm start
# or for development with auto-reload
npm run dev
```

5. Access the application
- Open browser: `http://localhost:4000`
- Default page: Login/Signup

---

## Routes Overview

| Method | Route | Description | Auth Required |
|--------|-------|-------------|--------------|
| GET | `/` | Login page | No |
| GET | `/signup` | Signup page | No |
| POST | `/` | Login user | No |
| POST | `/signup` | Register user | No |
| GET | `/logout` | Logout user | Yes |
| GET | `/forgotPass` | Forgot password form | No |
| POST | `/forgot-password` | Handle password reset | No |
| GET | `/home` | Dashboard | Yes |
| GET | `/view` | List all users | Yes |
| GET | `/insert` | Add user form | Yes |
| POST | `/insert` | Create new user | Yes |
| GET | `/singleView/:id` | View user details | Yes |
| GET | `/update/:id` | Edit user form | Yes |
| POST | `/update/:id` | Update user | Yes |
| GET | `/delete/:id` | Delete user | Yes |

---

## Usage

### Register a New Account
1. Navigate to `/signup`
2. Fill in Name, Email, Password
3. Click "Create Account"
4. Redirected to login page

### Login
1. Enter email and password
2. Click "Login"
3. Redirected to dashboard

### Add a User
1. Click "+ Add New" button
2. Fill in user details
3. Upload profile photo (optional)
4. Click "Save"

### View Users
1. Click "List" in sidebar
2. See all users in table with photos
3. Click "View" to see details
4. Click "Edit" to modify user
5. Click "Delete" with confirmation

### Logout
1. Click "Logout" button in header or sidebar
2. Redirected to login page
3. Session destroyed

---

## Design

- Theme: Teal (#39A6A3) matching navbar with variants (#2d8985, #4bb5b2)
- CSS: Centralized `public/css/style.css` with color variables
- Icons: Font Awesome 6.4.0
- Responsive: Mobile-first Bootstrap 5.3.8 (320px - 1920px)
- Security: Password hashing (bcryptjs), session auth, input validation

---

## Troubleshooting

**MongoDB connection error**
- Check MongoDB is running and connection string is correct in `config/db.js`

**Session not persisting**
- Ensure express-session is installed: `npm install express-session`

**Styling not applied**
- Ensure `/public/css/style.css` is properly linked in EJS files

**Images not displaying**
- Ensure `public/uploads/` directory exists for profile photos

---

## Future Enhancements

- Implement Multer for actual file uploads
- Email notifications for password reset
- User roles and permissions
- Search and filter users
- Pagination for user list
- User profile page
- Change password functionality
- Two-factor authentication
- API endpoints for mobile apps
- Database backup functionality
