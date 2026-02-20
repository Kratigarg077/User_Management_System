const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const Users = require('../models/user_model');

// Middleware in form of variable
const one = ((req, res, next) => {
    const d = new Date();
    console.log(`${req.method} :: ${req.url} :: ${d.getHours()} :: ${d.getMinutes()} :: ${d.getSeconds()}`);
    next();
});

const two = ((req, res, next) => {
    const d = new Date();
    console.log(`Hi 2nd Middleware ${req.method} :: ${req.url}`);
    next();
});

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
})

//File Size Limit (5MB)
const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
    fileFilter: (req, file, cb) => {

        if (file.mimetype.startsWith('image/')) {
            cb(null, true);   // accept only image files
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Default route - login page
router.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/home');
    }
    res.render('auth/login');
});

// Get signup page
router.get('/signup', (req, res) => {
    if (req.session.user) {
        return res.redirect('/home');
    }
    res.render('auth/signup');
});

// Login Route - authenticate existing user
router.post('/', async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        if (!userEmail || !userPassword) {
            return res.render('auth/login', {
                errorMsg: 'Email and password are required',
                formData: req.body
            });
        }

        const user = await Users.findOne({ userEmail });

        if (!user) {
            return res.render('auth/login', {
                errorMsg: 'Invalid email or password',
                formData: req.body
            });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(userPassword, user.userPassword);

        if (isPasswordMatch) {
            req.session.user = user;
            res.redirect('/home');
        } else {
            return res.render('auth/login', {
                errorMsg: 'Invalid email or password',
                formData: req.body
            });
        }

    } catch (error) {
        res.render('auth/login', {
            errorMsg: error.message,
            formData: req.body
        });
    }
});

// Signup Route - register new user
router.post('/signup', async (req, res) => {
    try {
        const { userName, userEmail, userPassword } = req.body;

        if (!userName || !userEmail || !userPassword) {
            return res.render('auth/signup', {
                errorMsg: 'All fields are required',
                formData: req.body
            });
        }

        const existingUser = await Users.findOne({ userEmail });

        if (existingUser) {
            return res.render('auth/signup', {
                errorMsg: 'User already exists. Try another email.',
                formData: req.body
            });
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);

        await Users.create({
            userName,
            userEmail,
            userPassword: hashedPassword
        });

        // Show success on login page
        res.render('auth/login', {
            successMsg: 'Signup successful! Please login.'
        });

    } catch (error) {
        res.render('auth/signup', {
            errorMsg: error.message,
            formData: req.body
        });
    }
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to logout' });
        }
        res.redirect('/');
    });
});

// Forgot Password route - display form
router.get('/forgotPass', (req, res) => {
    if (req.session.user) {
        return res.redirect('/home');
    }
    res.render('auth/forgotPass', {
        currentPath: req.path
    });
});

// Forgot Password route - handle reset
router.post('/forgot-password', async (req, res) => {
    try {
        const { userEmail } = req.body;

        if (!userEmail) {
            return res.status(400).send({ error: 'Email is required' });
        }

        const user = await Users.findOne({ userEmail });

        if (!user) {
            // For security, don't reveal if email exists
            return res.send('If an account with that email exists, reset instructions have been sent.');
        }
        // Email required but for now, just send a success message
        res.send('If an account with that email exists, reset instructions have been sent. <br><br> <a href="/">Back to login</a>');

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Apply isAuthenticated middleware to all routes below
router.use(isAuthenticated);


// Home route - display total users and latest user
router.get('/home', async (req, res) => {
    try {
        const totalUsers = await Users.countDocuments();
        const latestUser = await Users.findOne().sort({ _id: -1 });
        res.render('home', {
            currentPath: req.path,
            totalUsers,
            latestUser,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all users
router.get('/view', async (req, res) => {
    try {
        const users = await Users.find();
        res.render('viewUser', { 
            currentPath: req.path, 
            records: users,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Display insert user form
router.get('/insert', one, two, (req, res) => {
    res.render("insertUser", { 
        currentPath: req.path,
        user: req.session.user
    });
});

// Insert new user
router.post('/insert', upload.single('userPhoto'), async (req, res) => {
    try {

        await Users.insertOne({
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPhone: req.body.userPhone,
            userAddress: req.body.userAddress,
            userPhoto: req.file ? req.file.filename : null
        });

        res.redirect('/view');

    } catch (error) {

        // Multer errors OR other errors
        res.render('insertUser', {
            currentPath: '/insert',
            user: req.session.user,
            errorMsg: error.message,
            formData: req.body
        });
    }
});

// View single user
router.get('/singleView', async (req, res) => {
    return res.status(404).send({ error: "Page not found, enter complete route like /singleView/1" });
});

router.get('/singleView/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userData = await Users.findById(id);
        if (!userData) {
            return res.status(404).send({ error: "User not found" });
        }
        res.render("singleViewUser", { 
            record: userData, 
            currentPath: req.path,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Display update user form
router.get('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userData = await Users.findById(id);
        res.render("updateUser", {
            currentPath: req.path,
            record: userData,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update user
router.post('/update/:id', upload.single('userPhoto'), async (req, res) => {
    try {

        const id = req.params.id;

        const existingUser = await Users.findById(id);

        if (!existingUser) {
            return res.status(404).send("User not found");
        }

        // Prepare updated data
        const updatedData = {
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPhone: req.body.userPhone,
            userAddress: req.body.userAddress,
        };

        // If new image uploaded → replace
        if (req.file) {
            updatedData.userPhoto = req.file.filename;
            if (existingUser.userPhoto) {
                const filePath = path.join(__dirname, '../public/uploads/', existingUser.userPhoto);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);   // remove file
                }
            }
        }

        await Users.findByIdAndUpdate(id, updatedData);

        res.redirect('/view');

    } catch (error) {

        const userData = await Users.findById(req.params.id);

        res.render('updateUser', {
            currentPath: req.path,
            record: userData,
            user: req.session.user,
            errorMsg: error.message,
            formData: req.body
        });
    }
});

// Delete user
const fs = require('fs');
const path = require('path');

router.get('/delete/:id', async (req, res) => {
    try {

        const id = req.params.id;

        // Find user first
        const user = await Users.findById(id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Delete photo if exists
        if (user.userPhoto) {

            const filePath = path.join(__dirname, '../public/uploads/', user.userPhoto);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);   // remove file
            }
        }

        // Delete user from DB
        await Users.findByIdAndDelete(id);

        res.redirect('/view');

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;                    