let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const taskDateTime = document.getElementById('taskDateTime').value;

    if (taskText !== '') {
        const newTask = {
            id: Date.now(),
            text: taskText,
            datetime: taskDateTime,
            completed: false
        };

        tasks.push(newTask);
        taskInput.value = '';
        document.getElementById('taskDateTime').value = '';
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    renderTasks();
}

function filterTasks() {
    const filterValue = document.getElementById('filterSelect').value;
    let filteredTasks = [];

    if (filterValue === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filterValue === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else {
        filteredTasks = tasks;
    }

    renderTasks(filteredTasks);
}

function renderTasks(tasksToRender = tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasksToRender.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        li.innerHTML = `
            <span>${task.text}</span>
            <span>${task.datetime}</span>
            <div class="actions">
                <button onclick="toggleTask(${task.id})"><i class="far fa-check-circle"></i></button>
                <button onclick="deleteTask(${task.id})"><i class="far fa-trash-alt"></i></button>
            </div>
        `;

        taskList.appendChild(li);
    });
}
