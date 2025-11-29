// Run JavaScript after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage on page load
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task));

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Save task to localStorage
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Create task element in DOM
        createTaskElement(taskText);

        // Clear input field
        taskInput.value = '';
    }

    // Function to create a task element with remove button
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); 

        // Remove task on button click
        removeBtn.onclick = () => {
            taskList.removeChild(li);

            // Remove task from localStorage
            tasks = tasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    //Attach event listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
