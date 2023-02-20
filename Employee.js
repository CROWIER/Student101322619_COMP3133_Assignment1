const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
    },
    salary: Number,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;