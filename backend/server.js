const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Temporary storage
let tasks = [];

// ✅ ADD TASK
app.post("/tasks", (req, res) => {
    const { subject, title, deadline, priority } = req.body;

    // Validation
    if (!subject || !title || !deadline) {
        return res.status(400).json({ message: "All fields required" });
    }

    const task = {
        id: Date.now(),
        subject,
        title,
        deadline,
        priority,
        completed: false
    };

    tasks.push(task);
    res.json(task);
});

// 📥 GET TASKS
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// ❌ DELETE TASK
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    tasks = tasks.filter(task => task.id !== id);

    res.json({ message: "Task deleted" });
});

// ✅ MARK COMPLETE
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = true;
        }
        return task;
    });

    res.json({ message: "Task completed" });
});

// 🤖 AI SUGGESTIONS
app.get("/suggestions", (req, res) => {
    let suggestions = [];

    tasks.forEach(task => {
        const daysLeft = Math.ceil(
            (new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24)
        );

        if (!task.completed && daysLeft <= 2) {
            suggestions.push(`⚠️ Focus on "${task.title}" (Deadline soon!)`);
        }

        if (task.completed) {
            suggestions.push(`✅ Good job completing "${task.title}"`);
        }
    });

    if (tasks.length === 0) {
        suggestions.push("📚 Start by adding tasks");
    }

    res.json(suggestions);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log("Server running on port 5000");
});