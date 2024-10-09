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
    taskInput.value = '';
}

function createTaskItem(taskText) {
    const taskItem = document.createElement('li');
    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTask(taskItem, taskTextSpan);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => taskItem.remove();

    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    taskItem.addEventListener('click', (e) => {
        // Prevents the click event from triggering when clicking on the buttons
        if (e.target === editButton || e.target === deleteButton) return;
        taskItem.classList.toggle('completed');
    });

    return taskItem;
}

function editTask(taskItem, taskTextSpan) {
    const currentText = taskTextSpan.textContent;
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = currentText;
    editInput.classList.add('edit-input');

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.onclick = () => saveEdit(taskItem, taskTextSpan, editInput, saveButton);

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
