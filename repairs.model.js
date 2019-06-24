const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RepairsSchema = new Schema({
    carId: String,
    description: String,
    estTime: String,
    cost: String,
    progress: String,
    technician: String
});


// Export the model
module.exports = mongoose.model('Repairs', RepairsSchema);