document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);
    saveTasks(); 
    taskInput.value = '';
}

function createTaskItem(taskText) {
    const taskItem = document.createElement('li');
    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;

    const editButton = document.createElement('button');
    editButton.textContent = '✏️';
    editButton.style.color = 'white';
    editButton.style.marginLeft = '4px';
    editButton.style.width = '40px';
    editButton.onclick = () => editTask(taskItem, taskTextSpan);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️';
    
    deleteButton.style.color = 'white';
    deleteButton.classList.add('delete-button');

    deleteButton.onclick = () => {
        taskItem.remove();
        saveTasks(); 
    };

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(buttonContainer);

    return taskItem;
}

function editTask(taskItem, taskTextSpan) {
    const currentText = taskTextSpan.textContent;
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = currentText;
    editInput.classList.add('edit-input');

    const saveButton = document.createElement('button');
    saveButton.textContent = '✅';
    saveButton.style.color = 'white';
    saveButton.style.marginLeft = '6px';
    saveButton.classList.add('save-button');

    saveButton.onclick = () => {
        saveEdit(taskItem, taskTextSpan, editInput, saveButton);
        saveTasks(); 
    };

    taskItem.replaceChild(editInput, taskTextSpan);
    taskItem.appendChild(saveButton);
}

function saveEdit(taskItem, taskTextSpan, editInput, saveButton) {
    const newText = editInput.value.trim();

    if (newText === '') {
        alert('Task cannot be empty');
        return;
    }

    taskTextSpan.textContent = newText;
    taskItem.replaceChild(taskTextSpan, editInput);
    taskItem.removeChild(saveButton);
}

function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];
    taskList.querySelectorAll('li').forEach(taskItem => {
        const taskText = taskItem.querySelector('span').textContent;
        tasks.push(taskText);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');

    savedTasks.forEach(taskText => {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
    });
}
