let tasks = [];

function addTask() {
    const subject = document.getElementById("subject").value;
    const title = document.getElementById("title").value;
    const deadline = document.getElementById("deadline").value;
    const priority = document.getElementById("priority").value;

    if (!subject || !title || !deadline) {
        alert("Fill all fields");
        return;
    }

    const task = {
        id: Date.now(),
        subject,
        title,
        deadline,
        priority
    };

    tasks.push(task);

    displayTasks();
    generateSuggestions();
}

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");

        div.classList.add("task");

        // Priority color
        if (task.priority === "High") div.classList.add("high");
        if (task.priority === "Medium") div.classList.add("medium");
        if (task.priority === "Low") div.classList.add("low");

        div.innerHTML = `
            <b>${task.subject}</b><br>
            ${task.title}<br>
            📅 ${task.deadline}
            <button class="delete-btn" onclick="deleteTask(${task.id})">X</button>
        `;

        list.appendChild(div);
    });
}

function generateSuggestions() {
    const list = document.getElementById("suggestions");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerText = "Complete " + task.title + " soon!";
        list.appendChild(li);
    });
}