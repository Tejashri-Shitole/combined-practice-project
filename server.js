
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/studentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Mongoose Schema
const Student = mongoose.model("Student", {
    title: String,
    firstName: String,
    lastName: String,
    branch: String,
    degree: String,
    street: String,
    address: String,
    pin: Number,
    phoneCode: String,
    phone: Number,
    email: String
});

// Route to handle form submission
app.post('/create', async (req, res) => {
    const data = req.body;
    const newStudent = new Student(data);
    try {
        await newStudent.save();
        res.status(200).send("Student info saved to DB!");
    } catch (err) {
        res.status(400).send("Error saving to DB");
    }
});

// Start server
app.listen(8081, () => console.log("Server running on http://localhost:8081"));