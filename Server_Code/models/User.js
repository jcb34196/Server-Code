const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true,
        trim: true,
    },
    password: {
        requried: true,
        type: String,
        minLength: 8, 
    },
    name: {
        required: true,
        type: String,
        trim: true,
    },

    date: {
        required: true,
        type: String,
    },

    workouts: {
        required: true,
        type: Array
    }
});

module.exports= User = mongoose.model('user', userSchema);