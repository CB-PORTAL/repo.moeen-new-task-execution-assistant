document.getElementById('addTask').addEventListener('click', addNewTask);
   function addNewTask() {
       const taskList = document.getElementById('taskList');
       const taskName = document.getElementById('taskName').value;
       const action = document.getElementById('action').value;
       if (taskName && action) {
           const taskItem = document.createElement('div');
           taskItem.className = 'task-item';
           taskItem.innerHTML = `
               <strong>${taskName}</strong>: ${action}
               <button onclick="deleteTask(this)">Delete</button>
           `;
           taskList.appendChild(taskItem);
           saveTask(taskName, action);
           document.getElementById('taskName').value = '';
           document.getElementById('action').value = '';
       }
   }
   function saveTask(taskName, action) {
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
       // TODO: Remove task from chrome.storage as well
   }
   function loadTasks() {
       chrome.storage.sync.get('tasks', function(data) {
           const tasks = data.tasks || [];
           const taskList = document.getElementById('taskList');
           tasks.forEach(task => {
               const taskItem = document.createElement('div');
               taskItem.className = 'task-item';
               taskItem.innerHTML = `
                   <strong>${task.name}</strong>: ${task.action}
                   <button onclick="deleteTask(this)">Delete</button>
               `;
               taskList.appendChild(taskItem);
           });
       });
   }
   // Load existing tasks when the page loads
   document.addEventListener('DOMContentLoaded', loadTasks);