const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    name: String,
    venue: String,
    startTime: String,
    endTime: String,
    date: String,
    description: String,
    status: String,
    venueLink: String,
    image: String
});

module.exports = mongoose.model('Schedule', scheduleSchema);