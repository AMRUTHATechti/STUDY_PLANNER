const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    subject: String,
    title: String,
    deadline: Date,
    priority: String,
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Task", taskSchema);