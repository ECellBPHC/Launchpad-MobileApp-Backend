const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    name: String,
    venue: String,
    startTime: String,
    endTime: String,
    data: String,
    status: String
});

module.exports = mongoose.model('Schedule', scheduleSchema);