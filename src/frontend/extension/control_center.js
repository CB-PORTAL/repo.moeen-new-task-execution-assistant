// control_center.js
document.getElementById('addTask').addEventListener('click', addNewTask);

function addNewTask() {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <input type="text" placeholder="Task name">
        <input type="text" placeholder="Action">
        <button onclick="saveTask(this)">Save</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

function saveTask(button) {
    const taskItem = button.parentElement;
    const taskName = taskItem.querySelector('input[placeholder="Task name"]').value;
    const action = taskItem.querySelector('input[placeholder="Action"]').value;
   
    chrome.storage.sync.get('tasks', function(data) {
        const tasks = data.tasks || [];
        tasks.push({ name: taskName, action: action });
        chrome.storage.sync.set({ tasks: tasks }, function() {
            console.log('Task saved');
        });
    });
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}

// Load existing tasks
chrome.storage.sync.get('tasks', function(data) {
    const tasks = data.tasks || [];
    tasks.forEach(task => {
        const taskList = document.getElementById('taskList');
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <input type="text" value="${task.name}" placeholder="Task name">
            <input type="text" value="${task.action}" placeholder="Action">
            <button onclick="saveTask(this)">Save</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
});