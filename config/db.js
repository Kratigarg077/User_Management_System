const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/crud_app')
        .then(() => {
            console.log("Database Connected");
        })
        .catch((error) => {
            console.error("DB Connection Error:", error.message);
            process.exit(1);
        });
};

module.exports = connectDB