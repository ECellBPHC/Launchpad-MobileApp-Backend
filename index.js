const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const loginRoute = require("./routes/login");
const scheduleRoute = require('./routes/schedule');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose
  .connect("mongodb+srv://Paritosh:12345@launchpad23.cewfzia.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Example route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Login route
app.use(loginRoute);
app.use(scheduleRoute);


// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
