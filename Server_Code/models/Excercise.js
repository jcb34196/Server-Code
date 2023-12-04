const mongoose = require('mongoose');

const ExcerciseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    bodyPart: {
        type: String,
        required: true
    },

    equipment: {
        type: String,
        required: true
    },

    image: {
        type: String
    }
});

module.exports = Excercise = mongoose.model('excericse', ExcerciseSchema)