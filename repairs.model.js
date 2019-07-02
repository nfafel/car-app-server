const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RepairsSchema = new Schema({
    car: {
        type: Object,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    cost: {
        type: Number,
        min: [0, "Can't have a negative cost"],
        required: true
    },
    progress: {
        type: String,
        required: true
    }, 
    technician: {
        type: String,
        required: true
    }
});


// Export the model
module.exports = mongoose.model('Repairs', RepairsSchema);