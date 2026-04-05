const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ CONNECT MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/studyplanner")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Import model
const Task = require("./models/task");

// ✅ ADD TASK
app.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

// 📥 GET TASKS
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// ❌ DELETE TASK
app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

// ✅ MARK COMPLETE
app.put("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        { completed: true },
        { new: true }
    );
    res.json(task);
});

// 🤖 SUGGESTIONS
app.get("/suggestions", async (req, res) => {
    const tasks = await Task.find();

    let suggestions = [];

    tasks.forEach(task => {
        const daysLeft = Math.ceil(
            (new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24)
        );

        if (!task.completed && daysLeft <= 2) {
            suggestions.push(`⚠️ Focus on "${task.title}"`);
        }

        if (task.completed) {
            suggestions.push(`✅ Completed "${task.title}"`);
        }
    });

    if (tasks.length === 0) {
        suggestions.push("📚 Add tasks to begin");
    }

    res.json(suggestions);
});