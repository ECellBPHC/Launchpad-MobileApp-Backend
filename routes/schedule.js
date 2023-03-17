const express = require('express');
const scheduleSchema = require("../models/schedule")

const router = express.Router();

// Define the route to handle POST requests to /schedule
router.post('/schedule', (req, res) => {
  // Extract the parameters from the request body
  const { name, venue, startTime, endTime, data, status } = req.body;

  // Create a new schedule record with the extracted parameters
  const newSchedule = new scheduleSchema({
    name,
    venue,
    startTime,
    endTime,
    data,
    status
  });

  // Save the new schedule record to the database
  newSchedule.save()
    .then(() => {
      // Send a success response to the client
      res.status(201).json({ message: 'Schedule record created successfully' });
    })
    .catch(error => {
      // Send an error response to the client
      res.status(500).json({ error: error.message });
    });
});

router.get('/schedule', (req, res) => {
    // Find all schedule records in the database
    Schedule.find()
      .then(records => {
        // Send the schedule records to the client
        res.status(200).json(records);
      })
      .catch(error => {
        // Send an error response to the client
        res.status(500).json({ error: error.message });
      });
  });

module.exports = router;